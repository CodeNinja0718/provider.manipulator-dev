import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import api from 'utils/api';

export interface Options<TQueryFnData = unknown, TData = TQueryFnData>
  extends Omit<
    UseQueryOptions<TQueryFnData, unknown, TData, QueryKey>,
    'queryFn' | 'queryKey'
  > {
  queryKey: QueryKey;
  apiUrl: string;
  customParams?: Record<string, unknown>;
}

const useFetch = <TQueryFnData = unknown, TData = TQueryFnData>(
  options: Options<TQueryFnData, TData>,
) => {
  const { isReady } = useRouter();
  const { queryKey, apiUrl, customParams, ...otherOptions } = options;

  const fetchData = async () => {
    const { data: result } = await api.get(apiUrl, {
      params: customParams,
    });
    return result;
  };

  return useQuery(queryKey, fetchData, {
    enabled: isReady,
    ...otherOptions,
  });
};

export default useFetch;
