import { NextRequest, NextResponse } from 'next/server'
import { getPullRequest } from '@/lib/github-client'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import type { PRFile, PullRequestDetail } from '@/lib/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await requireGitHubToken()
    const prNumber = parseInt(params.id, 10)
    if (Number.isNaN(prNumber)) {
      return NextResponse.json({ error: 'Invalid PR number' }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'owner and repo query params are required' },
        { status: 400 }
      )
    }

    const { pr, files } = await getPullRequest(token, owner, repo, prNumber)

    const detail: PullRequestDetail = {
      id: String(pr.id),
      number: pr.number,
      title: pr.title,
      author: pr.user?.login || 'unknown',
      authorAvatar: pr.user?.avatar_url,
      repository: repo,
      owner,
      status: pr.merged_at ? 'merged' : pr.state === 'open' ? 'open' : 'closed',
      createdAt: pr.created_at,
      updatedAt: pr.updated_at,
      additions: pr.additions ?? 0,
      deletions: pr.deletions ?? 0,
      filesChanged: pr.changed_files ?? files.length,
      description: pr.body || undefined,
      url: pr.html_url,
      headRef: pr.head?.ref,
      baseRef: pr.base?.ref,
      body: pr.body || '',
      commits: pr.commits ?? 0,
      files: files.map(
        (f): PRFile => ({
          filename: f.filename,
          status: f.status,
          additions: f.additions,
          deletions: f.deletions,
          changes: f.changes,
          patch: f.patch,
        })
      ),
    }

    return NextResponse.json(detail, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    console.error('Error fetching PR:', error)
    return NextResponse.json({ error: 'Failed to fetch pull request' }, { status: 500 })
  }
}
