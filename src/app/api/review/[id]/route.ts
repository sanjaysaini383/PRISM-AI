import { NextRequest, NextResponse } from 'next/server'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import { reviewStore } from '@/lib/review-store'
import { runReview } from '@/lib/review-service'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await requireGitHubToken()
    const prNumber = parseInt(params.id, 10)
    if (Number.isNaN(prNumber)) {
      return NextResponse.json({ error: 'Invalid PR number' }, { status: 400 })
    }

    const body = await request.json().catch(() => ({}))
    const owner = body.owner || new URL(request.url).searchParams.get('owner')
    const repo = body.repo || new URL(request.url).searchParams.get('repo')

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'owner and repo are required' },
        { status: 400 }
      )
    }

    const existing = reviewStore.get(owner, repo, prNumber)
    if (existing?.status === 'running') {
      return NextResponse.json({
        message: 'Review already in progress',
        reviewId: existing.id,
        status: existing.status,
        phase: existing.phase,
      })
    }

    const record = reviewStore.create(owner, repo, prNumber)

    // Run async — client polls/SSE for updates
    runReview(token, owner, repo, prNumber).catch((err) => {
      console.error('Background review failed:', err)
    })

    return NextResponse.json({
      reviewId: record.id,
      owner,
      repo,
      prNumber,
      status: 'running',
      phase: record.phase,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    console.error('Error starting review:', error)
    return NextResponse.json({ error: 'Failed to start review' }, { status: 500 })
  }
}
