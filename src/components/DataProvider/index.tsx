import { useUser } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import getRedirecttUrl from 'utils/getRedirectUrl';
import Helper from 'utils/helpers';
import type { ROLES } from 'utils/type';

const DataProvider = () => {
  useUser({ enabled: true });
  const { pathname, replace } = useRouter();
  const role = Helper.getUserRole() as unknown as ROLES;
  const redirectUrl = getRedirecttUrl({ role, nextUrl: pathname });

  useEffect(() => {
    if (redirectUrl) {
      replace(redirectUrl);
    }
  }, [redirectUrl, replace]);

  return null;
};

export default DataProvider;
