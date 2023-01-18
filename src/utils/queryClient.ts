/* eslint-disable import/no-cycle */
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { get } from 'lodash';
import Router from 'next/router';
import Helper from 'utils/helpers';

import api from './api';
import errors from './errors';
import type { FetchDetailOptions, FetchListOptions } from './type';

const handleError = (error: unknown, _: unknown, context?: unknown) => {
  let errorMessage: string = get(error, 'error.message', '');
  const errorCode = get(error, 'error.code');
  if (context && get(context, 'action')) {
    errorMessage = errors[`${get(context, 'action')}_${errorCode}` as never];
  }
  if (errorMessage === 'Network Error') {
    // errorMessage = t('global.networkError');
  }
  if (errorCode === 'UNAUTHORIZED') {
    const queryClient = new QueryClient();
    queryClient.removeQueries(['currentUser']);
    Helper.removeWebCookie();
    Router.push('/');
  }
  Helper.toast(errorMessage, { type: 'error', toastId: errorMessage });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: true,
      refetchOnWindowFocus: false,
      retry: false,
      suspense: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
      onError: (error, query, context) => {
        handleError(error, query, context);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => handleError(error, query),
  }),
});

export const fetchDetail = ({
  queryKey,
  apiUrl,
  customParams,
  axiosConfig,
  ...options
}: FetchDetailOptions) => {
  return queryClient.fetchQuery(
    queryKey,
    async () => {
      const { data } = await api.get(apiUrl, {
        params: customParams,
        ...axiosConfig,
      });
      return data;
    },
    options,
  );
};

export const fetchList = ({
  queryKey,
  apiUrl,
  customParams,
  axiosConfig,
  omitKeys,
  ...options
}: FetchListOptions) => {
  const queryParams = { ...(customParams || {}) };
  if (!queryParams.limit) {
    queryParams.limit = 10;
  }
  if (!queryParams.page) {
    queryParams.page = 1;
  }
  if (omitKeys) {
    omitKeys.forEach((key) => {
      delete queryParams[key];
    });
  }
  return queryClient.fetchQuery(
    [...queryKey, queryParams],
    async () => {
      const { data } = await api.get(apiUrl, {
        params: queryParams,
        ...axiosConfig,
      });
      return data;
    },
    options,
  );
};
export default queryClient;
