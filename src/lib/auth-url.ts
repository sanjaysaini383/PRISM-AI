/**
 * Canonical app origin for OAuth redirects.
 * NEXT_PUBLIC_APP_URL should be the site root (no /api suffix).
 */
export function getAppOrigin(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (apiUrl) {
    // e.g. http://localhost:3000/api → http://localhost:3000
    return apiUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}

/** Must match "Authorization callback URL" in GitHub OAuth app settings exactly. */
export function getGitHubRedirectUri(): string {
  return `${getAppOrigin()}/api/auth/github/callback`
}
