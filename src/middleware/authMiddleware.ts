import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Adjust the import path as necessary

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public pages
  if (pathname.startsWith('/_next') || pathname.startsWith('/sign-in')) {
    return NextResponse.next();
  }

  // Check authentication for /blog pages
  const token = request.cookies.get('authToken'); // Adjust based on your authentication implementation

  if (!token && pathname.startsWith('/blog')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:path*'], // Apply middleware only to /blog and its subpaths
};
