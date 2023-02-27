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
    if (userData?.isNewRegistration) {
      if (nextUrl !== '/complete-profile') {
        return '/complete-profile';
      }
      return undefined;
    }
    if (nextUrl === '/complete-profile') {
      return '/';
    }
  }
  if (nextUrl.startsWith('/my-page')) {
    return '/login';
  }
  return undefined;
};

export default getRedirecttUrl;
