import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'ahc_admin';

// Paths that must stay reachable without a session.
const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const PUBLIC_API_PATHS = ['/api/admin/login'];

const verify = async (token) => {
  if (!token) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
};

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const authed = await verify(token);

  // Protect admin API routes (return 401 instead of redirecting).
  if (pathname.startsWith('/api/admin')) {
    if (PUBLIC_API_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      return NextResponse.next();
    }
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protect admin pages.
  if (pathname.startsWith('/admin')) {
    const isPublic = PUBLIC_ADMIN_PATHS.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    );

    if (isPublic) {
      // Already logged in? Skip the login page.
      if (authed && pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    if (!authed) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
