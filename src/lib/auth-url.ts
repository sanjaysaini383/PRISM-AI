import type { NextRequest } from 'next/server'

/**
 * Canonical app origin for OAuth redirects.
 * NEXT_PUBLIC_APP_URL should be the site root (no /api suffix).
 */
export function getAppOrigin(request?: NextRequest): string {
  if (request) {
    return request.nextUrl.origin
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (apiUrl) {
    return apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}

/** Must match "Authorization callback URL" in GitHub OAuth app settings exactly. */
export function getGitHubRedirectUri(request?: NextRequest): string {
  return `${getAppOrigin(request)}/api/auth/github/callback`
}
