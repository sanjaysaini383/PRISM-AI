/**
 * API client for PRISM AI backend
 * Handles GitHub PR fetching, review requests, and AI analysis
 */

export interface PullRequest {
  id: string
  number: number
  title: string
  author: string
  repository: string
  status: 'open' | 'merged' | 'closed'
  createdAt: string
  updatedAt: string
  additions: number
  deletions: number
  filesChanged: number
  description: string
  url: string
}

export interface Review {
  id: string
  prNumber: number
  status: 'analyzing' | 'completed' | 'failed'
  mergeConfidence: number
  securityScore: number
  findings: Finding[]
  generatedAt: string
  analyzedAt?: string
}

export interface Finding {
  type: 'security' | 'performance' | 'architecture' | 'quality'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  file?: string
  line?: number
  suggestion?: string
}

export interface Repository {
  id: string
  name: string
  url: string
  isConnected: boolean
  pullRequestsCount: number
  lastReviewedAt?: string
}

/**
 * Fetch pull requests from connected repositories
 */
export async function fetchPullRequests(
  limit: number = 10
): Promise<PullRequest[]> {
  try {
    const response = await fetch('/api/pulls', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Failed to fetch PRs')
    return response.json()
  } catch (error) {
    console.error('Error fetching PRs:', error)
    return []
  }
}

/**
 * Fetch a specific pull request
 */
export async function fetchPullRequest(
  prNumber: number
): Promise<PullRequest | null> {
  try {
    const response = await fetch(`/api/pulls/${prNumber}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Failed to fetch PR')
    return response.json()
  } catch (error) {
    console.error('Error fetching PR:', error)
    return null
  }
}

/**
 * Request AI review for a pull request
 */
export async function requestPRReview(prNumber: number): Promise<Review | null> {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prNumber }),
    })
    if (!response.ok) throw new Error('Failed to request review')
    return response.json()
  } catch (error) {
    console.error('Error requesting review:', error)
    return null
  }
}

/**
 * Fetch review results for a PR
 */
export async function fetchReview(prNumber: number): Promise<Review | null> {
  try {
    const response = await fetch(`/api/reviews/${prNumber}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Failed to fetch review')
    return response.json()
  } catch (error) {
    console.error('Error fetching review:', error)
    return null
  }
}

/**
 * Fetch connected repositories
 */
export async function fetchRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch('/api/repositories', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error('Failed to fetch repositories')
    return response.json()
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}

/**
 * Connect a GitHub repository
 */
export async function connectRepository(
  owner: string,
  repo: string
): Promise<Repository | null> {
  try {
    const response = await fetch('/api/repositories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner, repo }),
    })
    if (!response.ok) throw new Error('Failed to connect repository')
    return response.json()
  } catch (error) {
    console.error('Error connecting repository:', error)
    return null
  }
}
