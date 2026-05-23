/**
 * Mock data for PRISM AI dashboard and PR review
 * Simulates realistic PR analysis data
 */

export const mockPRData = {
  id: 'PR-1234',
  title: 'Implement user authentication system',
  author: 'alex-dev',
  repository: 'main-app',
  branch: 'feature/auth-system',
  baseBranch: 'main',
  description: `
    This PR implements a comprehensive authentication system with:
    - JWT token generation and validation
    - Refresh token mechanism
    - Multi-factor authentication (TOTP)
    - Rate limiting and security headers
    - Password hashing with bcrypt
  `,
  status: 'open',
  createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  updatedAt: new Date(),
  filesChanged: 12,
  additions: 456,
  deletions: 89,
  commits: 7,
  comments: 3,
  reviews: 2,
}

export const mockAIAnalysis = {
  mergeConfidence: 87,
  security: {
    score: 85,
    issues: [
      {
        severity: 'warning',
        title: 'Missing CSRF Protection',
        description: 'Consider adding CSRF tokens for state-changing operations',
      },
    ],
    vulnerabilities: 0,
  },
  performance: {
    score: 80,
    issues: [
      {
        severity: 'info',
        title: 'Token Generation Performance',
        description: 'Consider caching token templates for better performance',
      },
    ],
  },
  architecture: {
    score: 92,
    issues: [],
    patterns: ['Service Layer', 'Middleware Pattern', 'Error Handling'],
  },
  quality: {
    score: 88,
    coverage: 92,
    issues: [],
  },
  testing: {
    score: 85,
    suggestions: [
      'Add test for token refresh with expired token',
      'Test MFA flow with invalid TOTP codes',
      'Add performance test for token generation',
    ],
  },
}

export const mockDashboardStats = {
  totalReviews: 1247,
  avgMergeConfidence: 87,
  securityIssuesFound: 34,
  devProductivityGain: 3.2,
  avgReviewTime: '12 minutes',
  bugsPreventedThisMonth: 87,
}

export const mockRecentPRs = [
  {
    id: 'PR-1234',
    title: 'Add authentication system',
    status: 'merged',
    confidence: 92,
    time: '2h ago',
  },
  {
    id: 'PR-1233',
    title: 'Refactor database layer',
    status: 'in-review',
    confidence: 78,
    time: '4h ago',
  },
  {
    id: 'PR-1232',
    title: 'Fix security vulnerability',
    status: 'merged',
    confidence: 95,
    time: '1d ago',
  },
]

export const mockSecurityAlerts = [
  {
    id: 1,
    severity: 'critical',
    title: 'SQL Injection Vulnerability',
    description: 'Unsafe string concatenation in database query',
    file: 'src/db/queries.ts:45',
    pr: 'PR-1233',
    time: '2h ago',
  },
  {
    id: 2,
    severity: 'high',
    title: 'Hardcoded API Key',
    description: 'Sensitive credential exposed in source code',
    file: 'src/config.ts:12',
    pr: 'PR-1235',
    time: '5h ago',
  },
]
