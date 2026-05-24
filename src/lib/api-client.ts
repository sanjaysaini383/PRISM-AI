import type {
  GitHubUser,
  PullRequestDetail,
  PullRequestSummary,
  RepositorySummary,
  ReviewFinding,
  ReviewRecord,
  ReviewScores,
} from './types'

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  if (res.status === 401) {
    throw new AuthRequiredError()
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${res.status}`)
  }

  return res.json()
}

export class AuthRequiredError extends Error {
  constructor() {
    super('Authentication required')
    this.name = 'AuthRequiredError'
  }
}

export function fetchUser(): Promise<GitHubUser> {
  return apiFetch('/api/user')
}

export function fetchRepositories(): Promise<RepositorySummary[]> {
  return apiFetch('/api/repos')
}

export function fetchPullRequests(
  owner: string,
  repo: string,
  state: 'open' | 'closed' | 'all' = 'open',
  limit = 30
): Promise<PullRequestSummary[]> {
  const params = new URLSearchParams({ owner, repo, state, limit: String(limit) })
  return apiFetch(`/api/pulls?${params}`)
}

export function fetchPullRequest(
  owner: string,
  repo: string,
  prNumber: number
): Promise<PullRequestDetail> {
  const params = new URLSearchParams({ owner, repo })
  return apiFetch(`/api/pulls/${prNumber}?${params}`)
}

export function startReview(
  owner: string,
  repo: string,
  prNumber: number
): Promise<{ reviewId: string; status: string; phase: string }> {
  return apiFetch(`/api/review/${prNumber}`, {
    method: 'POST',
    body: JSON.stringify({ owner, repo }),
  })
}

export function fetchReviewStatus(
  owner: string,
  repo: string,
  prNumber: number
): Promise<{
  status: string
  phase: string
  phaseMessage: string
  findingsCount: number
}> {
  const params = new URLSearchParams({ owner, repo })
  return apiFetch(`/api/review-status/${prNumber}?${params}`)
}

export interface ReviewResults {
  reviewId: string
  status: string
  phase: string
  phaseMessage: string
  findings: ReviewFinding[]
  scores: ReviewScores | null
  summary: string | null
  review: string | null
  filesAnalyzed: number
}

export function fetchReviewResults(
  owner: string,
  repo: string,
  prNumber: number
): Promise<ReviewResults> {
  const params = new URLSearchParams({ owner, repo })
  return apiFetch(`/api/review-results/${prNumber}?${params}`)
}

export function fetchDashboardStats(): Promise<{
  totalReviews: number
  totalFindings: number
  severityCount: Record<string, number>
  categoryCount: Record<string, number>
  avgMergeConfidence: number | null
  recentReviews: Array<{
    id: string
    owner: string
    repo: string
    prNumber: number
    mergeConfidence?: number
    findingsCount: number
    updatedAt: string
  }>
}> {
  return apiFetch('/api/dashboard/stats')
}

export function generateFix(
  finding: ReviewFinding,
  fileContent?: string
): Promise<{ fix: string }> {
  return apiFetch('/api/review/fix', {
    method: 'POST',
    body: JSON.stringify({ finding, fileContent }),
  })
}

export function subscribeReviewStream(
  owner: string,
  repo: string,
  prNumber: number,
  handlers: {
    onStatus?: (data: { phase: string; phaseMessage: string; status: string }) => void
    onFindings?: (findings: ReviewFinding[]) => void
    onComplete?: (data: { scores: ReviewScores; summary: string }) => void
    onError?: (message: string) => void
  }
): () => void {
  const params = new URLSearchParams({ owner, repo })
  const es = new EventSource(`/api/review/${prNumber}/stream?${params}`)

  es.addEventListener('status', (e) => {
    handlers.onStatus?.(JSON.parse((e as MessageEvent).data))
  })

  es.addEventListener('findings', (e) => {
    const data = JSON.parse((e as MessageEvent).data)
    handlers.onFindings?.(data.findings || [])
  })

  es.addEventListener('complete', (e) => {
    const data = JSON.parse((e as MessageEvent).data)
    handlers.onComplete?.(data)
    es.close()
  })

  es.addEventListener('error', (e) => {
    if ((e as MessageEvent).data) {
      const data = JSON.parse((e as MessageEvent).data)
      handlers.onError?.(data.message)
    }
  })

  es.onerror = () => {
    // EventSource reconnects; only surface if closed
  }

  return () => es.close()
}

// Re-export types for convenience
export type {
  PullRequestSummary,
  PullRequestDetail,
  ReviewFinding,
  GitHubUser,
  RepositorySummary,
}
