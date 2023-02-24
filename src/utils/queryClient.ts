/* eslint-disable import/no-cycle */
import { QueryCache, QueryClient } from '@tanstack/react-query';
import { get } from 'lodash';
import Router from 'next/router';

import api from './api';
import errors from './errors';
import Helper from './helpers';
import type { FetchDetailOptions, FetchListOptions } from './type';

const handleError = (error: unknown, _: unknown, context?: unknown) => {
  const webCookie = Helper.getWebCookie();
  const rememberLogin = webCookie?.rememberLogin === 'true';

  let errorMessage: string = get(error, 'error', '');
  const errorCode = get(error, 'code');
  if (context && get(context, 'action')) {
    errorMessage = errors[`${get(context, 'action')}_${errorCode}` as never];
  }
  if (errorMessage === 'Network Error') {
    errorMessage = 'Network error';
  }
  if (errorCode === 401) {
    if (rememberLogin) {
      return;
    }
    const queryClient = new QueryClient();
    queryClient.removeQueries(['currentUser']);
    Helper.removeWebCookie();
    Router.replace('/');
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
