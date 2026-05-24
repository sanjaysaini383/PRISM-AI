import { NextRequest, NextResponse } from 'next/server'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import { generateFix } from '@/lib/review-service'
import type { ReviewFinding } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    await requireGitHubToken()
    const body = await request.json()
    const { finding, fileContent } = body as {
      finding: ReviewFinding
      fileContent?: string
    }

    if (!finding?.title) {
      return NextResponse.json({ error: 'finding is required' }, { status: 400 })
    }

    const fix = await generateFix(finding, fileContent)
    return NextResponse.json({ fix })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    console.error('Fix generation error:', error)
    return NextResponse.json({ error: 'Failed to generate fix' }, { status: 500 })
  }
}
