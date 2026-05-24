import { NextRequest, NextResponse } from 'next/server'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import { reviewStore } from '@/lib/review-store'
import { runReview } from '@/lib/review-service'

/** @deprecated Use POST /api/review/:id instead */
export async function POST(request: NextRequest) {
  try {
    const token = await requireGitHubToken()
    const body = await request.json()
    const { owner, repo, prNumber } = body

    if (!owner || !repo || !prNumber) {
      return NextResponse.json(
        { error: 'owner, repo, and prNumber are required' },
        { status: 400 }
      )
    }

    const record = reviewStore.create(owner, repo, prNumber)
    runReview(token, owner, repo, prNumber).catch(console.error)

    return NextResponse.json({
      reviewId: record.id,
      status: 'running',
      message: 'Use GET /api/review-results/:id for results',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to start review' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const owner = searchParams.get('owner')
  const repo = searchParams.get('repo')
  const prNumber = searchParams.get('prNumber')

  if (!owner || !repo || !prNumber) {
    return NextResponse.json(
      { error: 'Use GET /api/review-results/:id?owner=&repo=' },
      { status: 400 }
    )
  }

  return NextResponse.redirect(
    new URL(
      `/api/review-results/${prNumber}?owner=${owner}&repo=${repo}`,
      request.url
    )
  )
}
