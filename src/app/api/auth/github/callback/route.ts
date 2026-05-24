import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/github-client'
import { getGitHubRedirectUri } from '@/lib/auth-url'

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        new URL(`/?auth_error=${encodeURIComponent(error)}`, request.url)
      )
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      )
    }

    const redirectUri = getGitHubRedirectUri(request)

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      console.error('GitHub token error:', tokenData)
      return NextResponse.json(
        {
          error: 'Failed to get access token',
          details: tokenData.error_description || tokenData.error,
        },
        { status: 400 }
      )
    }

    const user = await getAuthenticatedUser(tokenData.access_token)

    const response = NextResponse.redirect(new URL('/dashboard', request.url))

    response.cookies.set('github_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })

    response.cookies.set(
      'user_info',
      JSON.stringify({
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        name: user.name,
      })
    )

    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
