import { NextRequest, NextResponse } from "next/server";

// List of protected routes
const protectedRoutes = [
  '/dashboard', 
  '/dashboard/blogs', 
  '/dashboard/create-blog', 
  '/dashboard/create-category', 
  '/dashboard/all-categories'
];

export function middleware(req: NextRequest) {
  // Check if user is authenticated
  const isAuthenticated = req.cookies.get('isAuthenticated')?.value === 'true';

  // If trying to access a protected route and not authenticated, redirect to login
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow access if authenticated or accessing an unprotected route
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Protect all dashboard-related routes
  ],
};
