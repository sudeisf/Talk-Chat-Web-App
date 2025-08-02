import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/register', '/api/auth'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasSession = request.cookies.has('sessionid');

  console.log('[MIDDLEWARE]', {
    path,
    cookies: Array.from(request.cookies).map(([name, value]) => ({ name, value })),
    hasSession,
  });

  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p));

  // If it's a protected route and no session
  if (!isPublic && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to visit login/register
  if (isPublic && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
