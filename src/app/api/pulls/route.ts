import { NextResponse, NextRequest } from 'next/server'
import { getRepositoryPullRequests } from '@/lib/github-client'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import type { PullRequestSummary } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const token = await requireGitHubToken()
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')
    const state = (searchParams.get('state') || 'open') as 'open' | 'closed' | 'all'
    const limit = parseInt(searchParams.get('limit') || '30', 10)

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'owner and repo query parameters are required' },
        { status: 400 }
      )
    }

    const prs = await getRepositoryPullRequests(token, owner, repo, state)

    const formatted: PullRequestSummary[] = prs.slice(0, limit).map((pr) => ({
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
      additions: (pr as any).additions ?? 0,
      deletions: (pr as any).deletions ?? 0,
      filesChanged: (pr as any).changed_files ?? 0,
      url: pr.html_url,
    }))

    return NextResponse.json(formatted, {
      headers: { 'Cache-Control': 'no-store, must-revalidate' },
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    console.error('Error fetching pull requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pull requests' },
      { status: 500 }
    )
  }
}
