/**
 * Environment variables for PRISM AI
 */

export const env = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  githubClientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || '',
}
