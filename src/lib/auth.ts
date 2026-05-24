import { cookies } from 'next/headers'
import type { GitHubUser } from './types'

export async function getGitHubToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('github_token')?.value ?? null
}

export async function requireGitHubToken(): Promise<string> {
  const token = await getGitHubToken()
  if (!token) {
    throw new AuthError('Not authenticated')
  }
  return token
}

export async function getUserFromCookie(): Promise<GitHubUser | null> {
  const cookieStore = await cookies()
  const raw = cookieStore.get('user_info')?.value
  if (!raw) return null
  try {
    return JSON.parse(raw) as GitHubUser
  } catch {
    return null
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}
