import { NextRequest, NextResponse } from 'next/server'
import { getGitHubRedirectUri } from '@/lib/auth-url'

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

export function GET(request: NextRequest) {
  if (!GITHUB_CLIENT_ID) {
    return NextResponse.json(
      { error: 'GitHub OAuth not configured' },
      { status: 500 }
    )
  }

  const redirectUri = getGitHubRedirectUri(request)

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo read:user user:email',
    allow_signup: 'true',
  })

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params}`

  return NextResponse.redirect(githubAuthUrl)
}
