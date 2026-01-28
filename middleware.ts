import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow admin routes to function normally
  if (path.startsWith('/admin')) {
    return NextResponse.next();
  }
  
  // Allow API routes to function normally
  if (path.startsWith('/api')) {
    return NextResponse.next();
  }
  
  // Allow static files and Next.js internals
  if (
    path.startsWith('/_next') ||
    path.startsWith('/static') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Redirect everything else to the lucky draw form
  if (path !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};