import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import api from 'utils/api';
import Helper from 'utils/helpers';

interface Options<TData, TVariables>
  extends Omit<UseMutationOptions<TVariables, unknown, TData>, 'mutationFn'> {
  apiUrl: string | ((params?: TData) => string);
  method?: string;
  defaultToast?: boolean;
  successMessage?: string;
}

const useMutate = <TData = unknown, TVariables = unknown>(
  options: Options<TData, TVariables>,
) => {
  const {
    apiUrl,
    defaultToast,
    method = 'post',
    successMessage,
    ...otherOptions
  } = options;
  return useMutation(
    async (params?: TData) => {
      const url = typeof apiUrl === 'string' ? apiUrl : apiUrl(params);
      switch (method) {
        case 'put': {
          const { data } = await api.put(url, params);
          return data;
        }
        case 'delete': {
          const { data } = await api.delete(url);
          return data;
        }
        case 'patch': {
          const { data } = await api.patch(url, params);
          return data;
        }
        default: {
          const { data } = await api.post(url, params);
          return data;
        }
      }
    },
    {
      onSuccess: () => {
        if (defaultToast || successMessage) {
          Helper.toast(successMessage || 'Completed', {
            type: 'success',
          });
        }
      },
      ...otherOptions,
    },
  );
};

export default useMutate;
