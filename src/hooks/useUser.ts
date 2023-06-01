import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import useFetch from 'hooks/useFetch';
import type { IProvider } from 'models/auth/interface';
import authQuery from 'models/auth/query';
import { USER_ROLES } from 'utils/const';
import Helper from 'utils/helpers';

export interface Options<TQueryFnData = unknown, TData = TQueryFnData>
  extends Omit<
    UseQueryOptions<TQueryFnData, unknown, TData, QueryKey>,
    'queryFn' | 'queryKey'
  > {
  customParams?: Record<string, unknown>;
}

const useUser = (options?: Options<IProvider>) => {
  const { enabled = true, ...otherOptions } = options || {};
  const webCookie = Helper.getWebCookie();
  const { data, ...other } = useFetch<IProvider>({
    ...authQuery.currentUser,
    enabled: enabled && !!webCookie,
    staleTime: Infinity,
    ...otherOptions,
  });
  const isOwner = data?.type === USER_ROLES.OWNER;

  return {
    data,
    isOwner,
    ...other,
  };
};

export default useUser;
