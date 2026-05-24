export type ReviewPhase =
  | 'idle'
  | 'fetching'
  | 'parsing'
  | 'security'
  | 'performance'
  | 'architecture'
  | 'quality'
  | 'summarizing'
  | 'completed'
  | 'failed'

export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type FindingCategory =
  | 'security'
  | 'performance'
  | 'architecture'
  | 'quality'
  | 'testing'

export interface ReviewFinding {
  id: string
  category: FindingCategory
  severity: FindingSeverity
  title: string
  description: string
  file?: string
  line?: number
  suggestion?: string
  fix?: string
}

export interface ReviewScores {
  mergeConfidence: number
  security: number
  performance: number
  architecture: number
  quality: number
}

export interface ReviewRecord {
  id: string
  owner: string
  repo: string
  prNumber: number
  status: 'pending' | 'running' | 'completed' | 'failed'
  phase: ReviewPhase
  phaseMessage: string
  findings: ReviewFinding[]
  scores: ReviewScores | null
  summary: string | null
  reviewText: string | null
  filesAnalyzed: number
  error?: string
  createdAt: string
  updatedAt: string
}

export interface PullRequestSummary {
  id: string
  number: number
  title: string
  author: string
  authorAvatar?: string
  repository: string
  owner: string
  status: 'open' | 'merged' | 'closed'
  createdAt: string
  updatedAt: string
  additions: number
  deletions: number
  filesChanged: number
  description?: string
  url?: string
  headRef?: string
  baseRef?: string
}

export interface PullRequestDetail extends PullRequestSummary {
  body: string
  commits: number
  files: PRFile[]
}

export interface PRFile {
  filename: string
  status: string
  additions: number
  deletions: number
  changes: number
  patch?: string
}

export interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  email?: string | null
  public_repos?: number
  followers?: number
}

export interface RepositorySummary {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  updated_at: string
  private: boolean
}

export function reviewKey(owner: string, repo: string, prNumber: number): string {
  return `${owner}/${repo}/${prNumber}`
}
