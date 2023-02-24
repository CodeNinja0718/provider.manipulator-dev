export const NON_LOGIN_ROUTE = ['/login', '/register'];

const getRedirecttUrl = ({
  nextUrl,
  token,
}: {
  nextUrl: string;
  token: string | undefined;
}): string | undefined => {
  if (token) {
    if (NON_LOGIN_ROUTE.includes(nextUrl)) {
      return '/';
    }
  } else if (nextUrl.startsWith('/my-page')) {
    return '/login';
  }
  return undefined;
};

export default getRedirecttUrl;
