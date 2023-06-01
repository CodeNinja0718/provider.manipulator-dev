/* eslint-disable import/no-cycle */

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import type { IListItem } from 'hooks/types';
import { get, map } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import process from 'process';
import type { ToastContent, ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';

import { DATE_FORMAT, DOCUMENT_TYPES, FILE_TYPES } from './const';
import queryClient from './queryClient';

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
  removeWebCookie: (): void => {
    deleteCookie(`${process.env.PROJECT_NAME}-web-cookie`, { path: '/' });
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

  convertManipulatorProfile: (detailData: IManipulatorItem) => {
    const {
      name,
      nameKana,
      email,
      photos,
      defaultShifts,
      careerStart,
      profile,
      pr,
      supportedSymptoms,
      nationalLicenses,
      verifyEmail,
    } = detailData;

    const avatarContent = photos.find((photo) => photo.type === 'avatar');
    const photoContent = photos.filter((photo) => photo.type === 'pr');
    let avatar = null;
    const photoImages: any[] = [];

    if (avatarContent) {
      avatar = {
        url: avatarContent.url,
        fileUrl: avatarContent.url,
        originUrl: avatarContent.url,
        objectKey: avatarContent.objectKey,
        key: avatarContent.objectKey,
      };
    }

    if (photoContent.length > 0) {
      photoContent.forEach((photo) => {
        photoImages.push({
          url: photo.url,
          fileUrl: photo.url,
          originUrl: photo.url,
          objectKey: photo.objectKey,
          key: photo.objectKey,
        });
      });
    }

    const newValues: ManipulatorProfileValues = {
      name,
      nameKana,
      email,
      pr,
      avatar,
      engagement: Number(careerStart) || 0,
      symptoms: supportedSymptoms.map((item) => item.id),
      description: profile,
      qualification: nationalLicenses.map(
        (item) => QUALIFICATION.find((value) => value.name === item)?.id,
      ),
      businessHours: defaultShifts.map((item) => ({
        ...item,
        hours: item.hours.map((hour) => ({
          startTime: dayjs(hour.startTime).tz().format('HH:mm'),
          endTime: dayjs(hour.endTime).tz().format('HH:mm'),
        })),
      })),
      photos: photoImages,
      isRegister: verifyEmail ? ['confirm_register'] : [],
    };

    return newValues;
  },

  convertManipulatorProfileUpdate: (
    profileData: ManipulatorProfileValues,
    manipulatorId: string,
  ) => {
    const {
      avatar,
      symptoms,
      description,
      qualification,
      photos,
      businessHours,
      engagement,
      isRegister,
      ...rest
    } = profileData;

    const photoArray =
      photos?.map((photo) => ({
        type: 'pr',
        objectKey: photo.key,
      })) || [];

    if (avatar) {
      photoArray.push({
        type: 'avatar',
        objectKey: avatar.key,
      });
    }

    return {
      ...rest,
      careerStart: `${engagement}`,
      profile: description,
      supportedSymptoms: symptoms,
      nationalLicenses: qualification?.map(
        (item) => QUALIFICATION.find((value) => value.id === item)?.name,
      ),
      photos: photoArray,
      defaultShifts:
        businessHours?.map((businessHour) => ({
          ...businessHour,
          hours: businessHour.hours?.filter(
            ({ startTime, endTime }) => startTime && endTime,
          ),
        })) || [],
      verifyEmail: (isRegister?.length || 0) > 0,
      manipulatorId,
    };
  },
};

export default Helper;
