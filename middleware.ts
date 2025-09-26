import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const user = await verifySession()

    // if no user or role is not ADMIN - redirect to dashboard
    if(!user || user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Check if the request is for the API routes
  if (pathname.startsWith('/api')) {
    // Get the Authorization header
    const authHeader = request.headers.get('Authorization')

    // If no Authorization header is present, return a 401 Unauthorized response
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Authorization header is required' },
        { status: 401 }
      )
    }

    // You can add additional authorization logic here
    // For example, validate JWT tokens, check specific auth schemes, etc.
  }

  // Continue with the request for non-API routes or if authorization is valid
  return NextResponse.next()
}

// Configure the middleware to only run on API routes
export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
}
