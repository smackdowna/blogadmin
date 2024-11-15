import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes you want to protect
const protectedRoutes = ['/', '/blogs', '/create-blog', '/create-category', '/all-categories'];

export function middleware(req: NextRequest) {
  // Check if user is authenticated by reading a cookie
  const isAuthenticated = req.cookies.get('isAuthenticated');

  // If the user is not authenticated and is trying to access a protected route, redirect them to /login
  if (protectedRoutes.some(route => req.nextUrl.pathname === route)) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access if authenticated or if accessing unprotected routes
  return NextResponse.next();
}

export const config = {
  // Define matcher to protect exact routes only
  matcher: [
    '/', 
    '/blogs', 
    '/create-blog', 
    '/create-category', 
    '/all-categories'
  ],
};
