import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Session } from 'next-auth';

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const currentPath = nextUrl.pathname;

  // Define protected routes and their required roles
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard': ['user', 'admin', 'moderator'],
    '/admin': ['admin'],
    '/moderator': ['admin', 'moderator'],
  };


  // Check if current path is protected
  const requiredRoles = Object.entries(protectedRoutes).find(([path]) =>
    currentPath.startsWith(path)
  )?.[1];

  if (requiredRoles) {
    if (!isLoggedIn) {
      console.log(`Unauthorized access attempt to ${currentPath}, redirecting to signin`);
      return NextResponse.redirect(new URL('/auth/signin', nextUrl));
    }

    const userRole = req.auth?.user?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
      console.log(`User with role ${userRole} denied access to ${currentPath}`);
      return NextResponse.redirect(new URL('/unauthorized', nextUrl));
    }
  }

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && (currentPath === '/auth/signin' || currentPath === '/auth/signup')) {
    console.log(`Authenticated user accessing ${currentPath}, redirecting to dashboard`);
    return NextResponse.redirect(new URL('/dashboard', nextUrl));
  }

  // Allow API routes to pass through
  if (currentPath.startsWith('/api/')) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};