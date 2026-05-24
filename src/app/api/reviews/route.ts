import { NextRequest, NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { cookies } from 'next/headers'
import { getPullRequest } from '@/lib/github-client'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { owner, repo, prNumber } = body

    const cookieStore = await cookies()
    const githubToken = cookieStore.get('github_token')?.value

    if (!githubToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Fetch PR details from GitHub
    const { pr, files } = await getPullRequest(githubToken, owner, repo, prNumber)

    // Build context from PR and files
    let prContext = `
Pull Request: ${pr.title}
Author: ${pr.user.login}
Description: ${pr.body || 'No description'}
Files changed: ${files.length}
Additions: ${pr.additions}
Deletions: ${pr.deletions}

File Changes:
${files
  .slice(0, 5)
  .map(
    (f: any) => `
- ${f.filename}
  Status: ${f.status}
  +${f.additions} -${f.deletions}
  Changes: ${f.changes}
`
  )
  .join('')}
`

    // Generate review using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert code reviewer. Review the following pull request and provide:
1. Overall assessment
2. Strengths of the changes
3. Issues or concerns
4. Specific recommendations
5. A merge confidence score (0-100)

Be concise but thorough. Focus on code quality, security, and best practices.`,
        },
        {
          role: 'user',
          content: prContext,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const reviewText =
      completion.choices[0]?.message?.content || 'Unable to generate review'

    // Extract merge confidence from response
    const confidenceMatch = reviewText.match(/\d+(?=%|\/100)/);
    const mergeConfidence = confidenceMatch ? parseInt(confidenceMatch[0]) : 75

    return NextResponse.json({
      prNumber,
      owner,
      repo,
      review: reviewText,
      mergeConfidence,
      filesAnalyzed: files.length,
      createdAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error generating review:', error)

    // Fallback review if OpenAI fails
    if (error.status === 429) {
      return NextResponse.json(
        {
          error: 'Rate limited by OpenAI. Please try again later.',
          mergeConfidence: 70,
          review: 'Unable to generate review due to rate limiting.',
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to generate review', message: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const prNumber = searchParams.get('prNumber')
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    const cookieStore = await cookies()
    const githubToken = cookieStore.get('github_token')?.value

    if (!githubToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Return cached/stored review if available
    // For now, return placeholder
    return NextResponse.json({
      prNumber,
      owner,
      repo,
      review: 'Fetch review by POSTing to this endpoint with owner, repo, and prNumber',
      mergeConfidence: 0,
    })
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    )
  }
}
