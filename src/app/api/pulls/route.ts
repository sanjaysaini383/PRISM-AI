import { NextResponse } from 'next/server'

// Mock PR data - in production this would come from GitHub API or database
const mockPullRequests = [
  {
    id: '1',
    number: 1234,
    title: 'Add authentication system',
    author: 'alex-dev',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    additions: 342,
    deletions: 45,
    filesChanged: 8,
  },
  {
    id: '2',
    number: 1233,
    title: 'Refactor database layer',
    author: 'sarah-backend',
    repository: 'codingfox',
    status: 'open' as const,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    additions: 521,
    deletions: 187,
    filesChanged: 12,
  },
  {
    id: '3',
    number: 1232,
    title: 'Fix security vulnerability',
    author: 'alex-dev',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    additions: 78,
    deletions: 34,
    filesChanged: 3,
  },
  {
    id: '4',
    number: 1231,
    title: 'Implement caching mechanism',
    author: 'mike-dev',
    repository: 'codingfox',
    status: 'open' as const,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    additions: 234,
    deletions: 89,
    filesChanged: 5,
  },
  {
    id: '5',
    number: 1230,
    title: 'Update dependencies',
    author: 'bot-auto',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    additions: 156,
    deletions: 123,
    filesChanged: 7,
  },
  {
    id: '6',
    number: 1229,
    title: 'Add API rate limiting',
    author: 'sarah-backend',
    repository: 'codingfox',
    status: 'open' as const,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    additions: 89,
    deletions: 12,
    filesChanged: 2,
  },
  {
    id: '7',
    number: 1228,
    title: 'Refactor UI components',
    author: 'alex-dev',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    additions: 445,
    deletions: 198,
    filesChanged: 15,
  },
  {
    id: '8',
    number: 1227,
    title: 'Fix build pipeline issues',
    author: 'devops-team',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    additions: 67,
    deletions: 45,
    filesChanged: 4,
  },
  {
    id: '9',
    number: 1226,
    title: 'Add monitoring and logging',
    author: 'mike-dev',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    additions: 234,
    deletions: 67,
    filesChanged: 8,
  },
  {
    id: '10',
    number: 1225,
    title: 'Implement error handling',
    author: 'alex-dev',
    repository: 'codingfox',
    status: 'merged' as const,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    additions: 178,
    deletions: 89,
    filesChanged: 6,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    
    // Return limited number of PRs, most recent first
    const prs = mockPullRequests.slice(0, Math.min(limit, mockPullRequests.length))
    
    return NextResponse.json(prs, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error fetching pull requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pull requests' },
      { status: 500 }
    )
  }
}
