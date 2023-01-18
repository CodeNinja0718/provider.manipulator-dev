// middleware.ts
// Currently there is a bug related to middleware
// https://github.com/vercel/next.js/pull/43919
// TODO: Update nextjs version
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import getRedirecttUrl from 'utils/getRedirectUrl';
import type { ROLES } from 'utils/type';

export function middleware(req: NextRequest) {
  const webCookie = JSON.parse(
    (req.cookies.get(`${process.env.PROJECT_NAME}-web-cookie`)?.value ||
      null) as string,
  );
  const nextUrl = req.nextUrl.pathname;
  const role = webCookie?.role as ROLES;

  const redirectUrl = getRedirecttUrl({ role, nextUrl });
  if (redirectUrl) {
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }
  return NextResponse.next();
}
