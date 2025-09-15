import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log(`🔍 Middleware executing for: ${pathname}`)
  
  // Skip middleware for API routes, static files, and auth callback
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    console.log(`⏭️ Skipping middleware for: ${pathname}`)
    return NextResponse.next()
  }

  // Get the session token from cookies
  
  const sessionToken = request.cookies.get('next-auth.session-token') || 
                      request.cookies.get('__Secure-next-auth.session-token')
  
  console.log(`🍪 Session token exists: ${!!sessionToken}`)
  
  // If accessing auth pages
  if (pathname.startsWith('/auth/')) {
    if (sessionToken) {
      console.log(`🔄 Authenticated user accessing auth page, redirecting to home`)
      return NextResponse.redirect(new URL('/', request.url))
    }
    console.log(`✅ Allowing access to auth page: ${pathname}`)
    return NextResponse.next()
  }
  
  // For all other pages, require authentication
  if (!sessionToken) {
    console.log(`🚫 Unauthenticated access to ${pathname}, redirecting to signin`)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
  
  console.log(`✅ Authenticated access to: ${pathname}`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}