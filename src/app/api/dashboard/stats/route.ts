import { NextResponse } from 'next/server'
import { requireGitHubToken, AuthError } from '@/lib/auth'
import { reviewStore } from '@/lib/review-store'

export async function GET() {
  try {
    await requireGitHubToken()

    const reviews = reviewStore.getAll().filter((r) => r.status === 'completed')
    const allFindings = reviews.flatMap((r) => r.findings)

    const severityCount = {
      critical: allFindings.filter((f) => f.severity === 'critical').length,
      high: allFindings.filter((f) => f.severity === 'high').length,
      medium: allFindings.filter((f) => f.severity === 'medium').length,
      low: allFindings.filter((f) => f.severity === 'low').length,
    }

    const confidences = reviews
      .map((r) => r.scores?.mergeConfidence)
      .filter((c): c is number => typeof c === 'number')

    const avgConfidence =
      confidences.length > 0
        ? Math.round(confidences.reduce((a, b) => a + b, 0) / confidences.length)
        : null

    const categoryCount = {
      security: allFindings.filter((f) => f.category === 'security').length,
      performance: allFindings.filter((f) => f.category === 'performance').length,
      architecture: allFindings.filter((f) => f.category === 'architecture').length,
      quality: allFindings.filter((f) => f.category === 'quality').length,
    }

    return NextResponse.json({
      totalReviews: reviews.length,
      totalFindings: allFindings.length,
      severityCount,
      categoryCount,
      avgMergeConfidence: avgConfidence,
      recentReviews: reviews
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 10)
        .map((r) => ({
          id: r.id,
          owner: r.owner,
          repo: r.repo,
          prNumber: r.prNumber,
          mergeConfidence: r.scores?.mergeConfidence,
          findingsCount: r.findings.length,
          updatedAt: r.updatedAt,
        })),
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}
