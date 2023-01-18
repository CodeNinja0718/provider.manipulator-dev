import axios from 'axios';
import { get } from 'lodash';

// eslint-disable-next-line import/no-cycle
import Helper from './helpers';

const api = axios.create({
  baseURL: `${process.env.API_SERVER_BASE_URL}`,
});

api.interceptors.request.use((config) => {
  const requestConfig = {
    ...config,
  };
  const webCookie = Helper.getWebCookie();
  requestConfig.headers = requestConfig.headers ?? {};
  requestConfig.headers['Accept-Timezone'] =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (webCookie?.token) {
    requestConfig.headers.Authorization = `Bearer ${webCookie?.token}`;
  }

  return requestConfig;
});

api.interceptors.response.use(
  (response) => response.data,
  ({ message, response }) => {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      data: get(response, 'data.data'),
      error: get(response, 'data.error', message),
      code: get(response, 'data.code', response?.status || -1),
    });
  },
);

export default api;
