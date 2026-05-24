import OpenAI from 'openai'
import { getPullRequest } from './github-client'
import { reviewStore } from './review-store'
import type { ReviewFinding, ReviewScores } from './types'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const PHASES = [
  { phase: 'parsing' as const, message: 'Parsing diff and file changes...' },
  { phase: 'security' as const, message: 'Reviewing security...' },
  { phase: 'performance' as const, message: 'Analyzing performance...' },
  { phase: 'architecture' as const, message: 'Checking architecture...' },
  { phase: 'quality' as const, message: 'Evaluating code quality...' },
  { phase: 'summarizing' as const, message: 'Generating summary and merge confidence...' },
]

function buildDiffContext(
  pr: { title: string; body: string | null; user: { login: string }; additions: number; deletions: number },
  files: Array<{ filename: string; status: string; additions: number; deletions: number; patch?: string }>
): string {
  const fileBlocks = files.slice(0, 15).map((f) => {
    const patch = f.patch ? f.patch.slice(0, 2500) : '(no patch)'
    return `### ${f.filename} (${f.status}, +${f.additions}/-${f.deletions})
\`\`\`diff
${patch}
\`\`\``
  })

  return `PR: ${pr.title}
Author: ${pr.user.login}
Description: ${pr.body || 'None'}
Stats: +${pr.additions} -${pr.deletions}, ${files.length} files

${fileBlocks.join('\n\n')}`
}

async function analyzePhase(
  context: string,
  focus: string,
  category: ReviewFinding['category']
): Promise<ReviewFinding[]> {
  if (!process.env.OPENAI_API_KEY) {
    return []
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an expert code reviewer focused on ${focus}.
Return ONLY valid JSON array (no markdown). Each item:
{"title":"...","description":"...","severity":"critical|high|medium|low|info","file":"path or null","line":number or null,"suggestion":"...","fix":"optional code fix"}
Max 5 items. If no issues, return [].`,
      },
      { role: 'user', content: context.slice(0, 12000) },
    ],
    temperature: 0.3,
    max_tokens: 1500,
    response_format: { type: 'json_object' },
  })

  const raw = completion.choices[0]?.message?.content || '{"findings":[]}'
  try {
    const parsed = JSON.parse(raw)
    const list = Array.isArray(parsed) ? parsed : parsed.findings || []
    return list.map((item: Record<string, unknown>, i: number) => ({
      id: `${category}-${Date.now()}-${i}`,
      category,
      severity: (item.severity as ReviewFinding['severity']) || 'medium',
      title: String(item.title || 'Issue'),
      description: String(item.description || ''),
      file: item.file ? String(item.file) : undefined,
      line: typeof item.line === 'number' ? item.line : undefined,
      suggestion: item.suggestion ? String(item.suggestion) : undefined,
      fix: item.fix ? String(item.fix) : undefined,
    }))
  } catch {
    return []
  }
}

async function generateSummary(
  context: string,
  findings: ReviewFinding[]
): Promise<{ summary: string; reviewText: string; scores: ReviewScores }> {
  const findingSummary = findings
    .map((f) => `- [${f.severity}] ${f.title} (${f.file || 'general'})`)
    .join('\n')

  if (!process.env.OPENAI_API_KEY) {
    const critical = findings.filter((f) => f.severity === 'critical').length
    const high = findings.filter((f) => f.severity === 'high').length
    const mergeConfidence = Math.max(20, 95 - critical * 25 - high * 10)

    return {
      summary: 'Review completed without OpenAI API key. Configure OPENAI_API_KEY for full analysis.',
      reviewText: findingSummary || 'No findings.',
      scores: {
        mergeConfidence,
        security: Math.max(0, 100 - critical * 30),
        performance: 75,
        architecture: 75,
        quality: 75,
      },
    }
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `Summarize the PR review. Return ONLY valid JSON:
{"summary":"2-3 sentences","reviewText":"detailed markdown review","mergeConfidence":0-100,"security":0-100,"performance":0-100,"architecture":0-100,"quality":0-100}`,
      },
      {
        role: 'user',
        content: `PR Context:\n${context.slice(0, 8000)}\n\nFindings:\n${findingSummary}`,
      },
    ],
    temperature: 0.4,
    max_tokens: 1200,
    response_format: { type: 'json_object' },
  })

  const raw = completion.choices[0]?.message?.content || '{}'
  const parsed = JSON.parse(raw)

  return {
    summary: String(parsed.summary || 'Review complete.'),
    reviewText: String(parsed.reviewText || findingSummary),
    scores: {
      mergeConfidence: Number(parsed.mergeConfidence) || 70,
      security: Number(parsed.security) || 70,
      performance: Number(parsed.performance) || 70,
      architecture: Number(parsed.architecture) || 70,
      quality: Number(parsed.quality) || 70,
    },
  }
}

export async function runReview(
  token: string,
  owner: string,
  repo: string,
  prNumber: number
): Promise<void> {
  reviewStore.create(owner, repo, prNumber)
  reviewStore.setPhase(owner, repo, prNumber, 'fetching', 'Fetching pull request from GitHub...')

  try {
    const { pr, files } = await getPullRequest(token, owner, repo, prNumber)
    const context = buildDiffContext(pr, files)

    reviewStore.update(owner, repo, prNumber, {
      status: 'running',
      filesAnalyzed: files.length,
    })

    const phaseMap: Record<string, { focus: string; category: ReviewFinding['category'] }> = {
      security: { focus: 'security vulnerabilities and unsafe patterns', category: 'security' },
      performance: { focus: 'performance bottlenecks and inefficiencies', category: 'performance' },
      architecture: { focus: 'architecture, coupling, and design patterns', category: 'architecture' },
      quality: { focus: 'code quality, readability, and maintainability', category: 'quality' },
    }

    const allFindings: ReviewFinding[] = []

    for (const step of PHASES) {
      reviewStore.setPhase(owner, repo, prNumber, step.phase, step.message)

      if (step.phase === 'parsing') {
        await new Promise((r) => setTimeout(r, 300))
        continue
      }

      if (step.phase === 'summarizing') {
        const { summary, reviewText, scores } = await generateSummary(context, allFindings)
        reviewStore.complete(owner, repo, prNumber, {
          scores,
          summary,
          reviewText,
          filesAnalyzed: files.length,
        })
        return
      }

      const config = phaseMap[step.phase]
      if (config) {
        const findings = await analyzePhase(context, config.focus, config.category)
        allFindings.push(...findings)
        reviewStore.addFindings(owner, repo, prNumber, findings)
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Review failed'
    reviewStore.fail(owner, repo, prNumber, message)
    throw error
  }
}

export async function generateFix(
  finding: ReviewFinding,
  fileContent?: string
): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    return finding.fix || finding.suggestion || 'Configure OPENAI_API_KEY to generate fixes.'
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Generate a safe code fix. Return ONLY the fixed code snippet, no markdown fences.',
      },
      {
        role: 'user',
        content: `Issue: ${finding.title}\n${finding.description}\nFile: ${finding.file || 'unknown'}\nLine: ${finding.line || 'unknown'}\n\nContext:\n${fileContent?.slice(0, 4000) || 'N/A'}\n\nSuggestion: ${finding.suggestion || ''}`,
      },
    ],
    temperature: 0.2,
    max_tokens: 800,
  })

  return completion.choices[0]?.message?.content?.trim() || finding.suggestion || ''
}
