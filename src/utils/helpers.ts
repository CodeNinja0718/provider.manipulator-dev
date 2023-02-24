/* eslint-disable import/no-cycle */

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import type { IListItem } from 'hooks/types';
import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import process from 'process';
import type { ToastContent, ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

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

  setToken: (data: Record<string, string>, remember?: boolean): void =>
    setCookie(`${process.env.PROJECT_NAME}-web-cookie`, data, {
      path: '/',
      ...(remember
        ? {
            maxAge: 7776000,
          }
        : {
            maxAge: 86400,
          }),
    }),
  removeWebCookie: (): void =>
    deleteCookie(`${process.env.PROJECT_NAME}-web-cookie`, { path: '/' }),
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
      Helper.toast('Invalid', { type: 'error' });
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
};

export default Helper;
