/* eslint-disable import/no-cycle */

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import type { IListItem } from 'hooks/types';
import { get, map } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import process from 'process';
import type { ToastContent, ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

import {
  DATE_FORMAT,
  DATE_LONG_FORMAT,
  DOCUMENT_TYPES,
  FILE_TYPES,
  GTM_JP,
} from './const';

const Helper = {
  getWebCookie: (
    req?: NextApiRequest,
    res?: NextApiResponse,
  ): Record<string, string> => {
    const cookies = JSON.parse(
      (getCookie(
        `${process.env.PROJECT_NAME}-web-cookie`,
        req && res ? { req, res } : {},
      ) || null) as string,
    );
    return cookies;
  },
  getUserRole: () => {
    const webCookie = Helper.getWebCookie();
    return get(webCookie, 'role');
  },
  setToken: async (data: Record<string, string>, remember?: boolean) => {
    await setCookie(`${process.env.PROJECT_NAME}-web-cookie`, data, {
      path: '/',
      ...(remember
        ? {
            maxAge: 7776000,
          }
        : {
            maxAge: 86400,
          }),
    });
  },
  setRole: (isOwner: boolean) => setCookie('isOwner', isOwner),
  getRole: () => getCookie('isOwner'),
  removeWebCookie: (): void => {
    deleteCookie(`${process.env.PROJECT_NAME}-web-cookie`, { path: '/' });
    deleteCookie(`isOwner`, { path: '/' });
  },
  convertObjectToOptions: (obj: Record<string, string>): IListItem[] => {
    return Object.keys(obj).map((key) => ({
      id: key,
      name: obj[key] as string,
    }));
  },
  getTokenConfig: (req: unknown, res: unknown) => {
    const cookies = Helper.getWebCookie(
      req as NextApiRequest,
      res as NextApiResponse,
    );
    const { token } = cookies;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
  checkValidImage: (file: File, config?: { maxSize: number; type: string }) => {
    const maxSize = config?.maxSize || 5;
    const type = config?.type || 'image';
    if (!file.type.startsWith(type)) {
      Helper.toast('Invalid format', { type: 'error' });
      return false;
    }
    if (file.size > 1000000 * maxSize) {
      Helper.toast('invalid size', {
        type: 'error',
      });
      return false;
    }
    return true;
  },
  checkValidDocument: (
    file: File,
    config?: { maxSize: number; type: string[] },
  ) => {
    const maxSize = config?.maxSize || 5;
    const type = config?.type || DOCUMENT_TYPES;
    const currentType: string = file?.type.split('/')?.[1] || '';

    if (!type.includes(currentType)) {
      Helper.toast('Invalid format', { type: 'error' });
      return false;
    }
    if (file.size > 1000000 * maxSize) {
      Helper.toast('invalid size', {
        type: 'error',
      });
      return false;
    }
    return true;
  },
  detectFileType: (file: File | any) => {
    const currentType: string = file?.type.split('/')?.[1] || '';
    return DOCUMENT_TYPES.includes(file?.type) ||
      DOCUMENT_TYPES.includes(currentType)
      ? FILE_TYPES.DOCUMENT
      : FILE_TYPES.IMAGE;
  },
  formatUrl: (url: string) => {
    if (typeof url !== 'string') {
      return undefined;
    }
    return url.startsWith('https://') || url.startsWith('http://')
      ? url
      : `http://${url}`;
  },
  convertArrayToEntities: (array: IListItem[]) => {
    const ids: string[] = [];
    const entities = (array || []).reduce((acc, cur) => {
      ids.push(cur.id);
      return { ...acc, [cur.id]: cur };
    }, {});
    return {
      ids,
      entities,
    };
  },

  toast: (
    message: ToastContent<unknown>,
    options?: ToastOptions<{}> | undefined,
  ) => {
    const type = get(options, 'type', 'success');
    return toast(message, {
      type,
      ...options,
    });
  },
  getYouTubeVideoIdFromUrl: (url: string) => {
    // Our regex pattern to look for a youTube ID
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    // Match the url with the regex
    const match = url.match(regExp);
    // Return the result
    return match && match[2]?.length === 11 ? match[2] : undefined;
  },
  addComma: (value: string | number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  toASCII: (chars: any) => {
    let ascii = '';
    for (let i = 0, l = chars.length; i < l; i += 1) {
      let c = chars[i].charCodeAt(0);
      // make sure we only convert half-full width char
      if (c >= 0xff00 && c <= 0xffef) {
        // eslint-disable-next-line no-bitwise
        c = 0xff & (c + 0x20);
      }
      ascii += String.fromCharCode(c);
    }
    return ascii;
  },
  parseURLByParams: (params: object, url: string) => {
    const convertParamsToString: string[] = [];
    map(params, (value, key) =>
      convertParamsToString.push(
        `${key}=${encodeURIComponent(value as string)}`,
      ),
    );
    const newURL = `${url}?${convertParamsToString.join('&')}`;
    return newURL;
  },

  getValidDate: (date?: string | string[], dayAdded?: number) => {
    if (
      date &&
      typeof date === 'string' &&
      dayjs(date, DATE_FORMAT).isValid()
    ) {
      const currentDate = dayjs(date, DATE_FORMAT);
      if (typeof dayAdded === 'number') {
        return currentDate.add(dayAdded, 'day').format(DATE_FORMAT);
      }
      return currentDate.format(DATE_FORMAT);
    }
    return dayjs().format(DATE_FORMAT);
  },

  parseTimeIsoString: (value: string, date: string) => {
    const splitValue = value.split(':');
    const result = new Date(date).setHours(
      Number(splitValue[0]) || 0,
      Number(splitValue[1]) || 0,
      0,
    );

    return new Date(
      `${dayjs(result).format(DATE_LONG_FORMAT)} ${GTM_JP}`,
    ).toISOString();
  },
};

export default Helper;
