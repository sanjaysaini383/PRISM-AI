import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/github-client'
import { getGitHubToken, getUserFromCookie } from '@/lib/auth'

export async function GET() {
  try {
    const token = await getGitHubToken()
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const cached = await getUserFromCookie()
    const user = await getAuthenticatedUser(token)

    return NextResponse.json({
      id: user.id,
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      email: user.email,
      public_repos: user.public_repos,
      followers: user.followers,
      html_url: user.html_url,
      cached: cached?.login === user.login,
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 })
  }
}
