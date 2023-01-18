import type { ROLES } from './type';

const getRedirecttUrl = ({
  role,
  nextUrl,
}: {
  role?: ROLES;
  nextUrl: string;
}): string | undefined => {
  if (role && nextUrl) {
    // return redirect url
  }
  return undefined;
};

export default getRedirecttUrl;
