import { NextResponse } from 'next/server'

export function GET() {
  const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'))
  
  // Clear authentication cookies
  response.cookies.set('github_token', '', {
    maxAge: 0,
  })
  response.cookies.set('user_info', '', {
    maxAge: 0,
  })
  
  return response
}
