// middleware.ts
// Currently there is a bug related to middleware
// https://github.com/vercel/next.js/pull/43919
// TODO: Update nextjs version
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import getRedirecttUrl from 'utils/getRedirectUrl';

export function middleware(req: NextRequest) {
  const webCookie = JSON.parse(
    req.cookies.get(`${process.env.PROJECT_NAME}-web-cookie`)?.value || '{}',
  );
  const nextUrl = req.nextUrl.pathname;
  const token = webCookie?.accessToken;

  const redirectUrl = getRedirecttUrl({
    nextUrl,
    token,
  });
  if (redirectUrl) {
    const response = NextResponse.redirect(new URL(redirectUrl, req.url));
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  return response;
}

export const config = {
  matcher: ['/login', '/register', '/my-page/:path*'],
};
