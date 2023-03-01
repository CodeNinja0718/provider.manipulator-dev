import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import useFetch from 'hooks/useFetch';
import type { IProvider } from 'models/auth/interface';
import authQuery from 'models/auth/query';
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

  return useFetch<IProvider>({
    ...authQuery.currentUser,
    enabled: enabled && !!webCookie,
    staleTime: Infinity,
    onSuccess: (data) => {
      Helper.setUserData(data);
    },
    ...otherOptions,
  });
};

export default useUser;
