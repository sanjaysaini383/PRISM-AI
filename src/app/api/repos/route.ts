import { NextRequest, NextResponse } from 'next/server'
import { getUserRepositories } from '@/lib/github-client'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const githubToken = cookieStore.get('github_token')?.value

    if (!githubToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const repos = await getUserRepositories(githubToken)

    return NextResponse.json(repos, {
      headers: {
        'Cache-Control': 'max-age=300, must-revalidate', // Cache for 5 minutes
      },
    })
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}
