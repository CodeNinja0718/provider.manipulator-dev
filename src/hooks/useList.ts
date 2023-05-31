import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { IListResult } from 'hooks/types';
import { useRouter } from 'next/router';
import api from 'utils/api';

interface Options<TQueryFnData = unknown>
  extends Omit<
    UseQueryOptions<unknown, unknown, IListResult<TQueryFnData>, unknown[]>,
    'queryFn' | 'queryKey'
  > {
  customParams?: Record<string, unknown>;
  queryKey: unknown[];
  apiUrl: string;
  omitKeys?: string[];
}

// const getSortString = (orderBy: string, order: string): string => {
//   if (order === 'true') {
//     return `${orderBy}.desc`;
//   }
//   return `${orderBy}.asc`;
// };

const useList = <TQueryFnData = unknown>(
  options: Options<TQueryFnData>,
): {
  list: TQueryFnData[] | undefined;
  total: number;
  page: number;
  perPage: number;
  isFetching: boolean;
  isLoading: boolean;
  totalPages: number;
  refetch: () => Promise<unknown>;
} => {
  const { queryKey, apiUrl, customParams, omitKeys, ...otherOptions } = options;
  const router = useRouter();
  const searchParams = router.query;

  const params = {
    page: searchParams.page || 1,
    limit: searchParams.limit || 10,
    ...searchParams,
    ...customParams, // Do not change the order. Please pass another param if you want to override the params
  };

  const formatParams = (_params: Record<string, unknown>) => {
    const formattedParams = { ..._params };
    // if (formattedParams.orderBy && formattedParams.order) {
    //   formattedParams.sort = getSortString(
    //     formattedParams.orderBy as string,
    //     formattedParams.order as string,
    //   );
    //   delete formattedParams.order;
    //   delete formattedParams.orderBy;
    // }
    if (omitKeys) {
      omitKeys.forEach((key) => {
        delete formattedParams[key];
      });
    }
    return formattedParams;
  };

  const formattedParams = formatParams(params);
  const { data, isFetching, refetch, isLoading } = useQuery(
    [...queryKey, formattedParams],
    async () => {
      if (apiUrl.includes('undefined')) {
        return null;
      }

      const { data: result }: { data: IListResult<TQueryFnData> } =
        await api.get(apiUrl, {
          params: formattedParams,
        });
      return result;
    },
    {
      enabled: router.isReady,
      ...otherOptions,
    },
  );

  return {
    list: data?.docs || data?.items || undefined,
    total: data?.totalDocs || 0,
    totalPages: data?.totalPages || 0,
    page: data?.page || 1,
    perPage: data?.limit || 10,
    isLoading,
    isFetching,
    refetch,
  };
};
export default useList;
