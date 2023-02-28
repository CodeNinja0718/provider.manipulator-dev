import type { IProvider } from 'models/auth/interface';

export const NON_LOGIN_ROUTE = ['/login', '/register'];

const getRedirecttUrl = ({
  nextUrl,
  token,
  userData,
}: {
  nextUrl: string;
  token: string | undefined;
  userData?: IProvider;
}): string | undefined => {
  if (token) {
    if (NON_LOGIN_ROUTE.includes(nextUrl)) {
      return '/';
    }
    if (
      userData?.isNewRegistration &&
      userData?.type === 'Owner' &&
      nextUrl !== '/complete-profile'
    ) {
      return '/complete-profile';
    }
    if (nextUrl === '/complete-profile') {
      return '/';
    }
    return undefined;
  }
  if (nextUrl.startsWith('/my-page') || nextUrl === '/complete-profile') {
    return '/login';
  }
  return undefined;
};

export default getRedirecttUrl;
