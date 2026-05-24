import { NextRequest, NextResponse } from 'next/server'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import { reviewStore } from '@/lib/review-store'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireGitHubToken()
    const prNumber = parseInt(params.id, 10)
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get('owner')
    const repo = searchParams.get('repo')

    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'owner and repo query params required' },
        { status: 400 }
      )
    }

    const record = reviewStore.get(owner, repo, prNumber)
    if (!record) {
      return NextResponse.json({
        prNumber,
        owner,
        repo,
        status: 'idle',
        phase: 'idle',
        phaseMessage: 'No review started',
        findingsCount: 0,
      })
    }

    return NextResponse.json({
      reviewId: record.id,
      prNumber: record.prNumber,
      owner: record.owner,
      repo: record.repo,
      status: record.status,
      phase: record.phase,
      phaseMessage: record.phaseMessage,
      findingsCount: record.findings.length,
      filesAnalyzed: record.filesAnalyzed,
      error: record.error,
      updatedAt: record.updatedAt,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to get status' }, { status: 500 })
  }
}
