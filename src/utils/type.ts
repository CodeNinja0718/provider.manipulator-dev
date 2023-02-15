import type { FetchQueryOptions } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';

export interface INavigation {
  href: string;
  label?: string;
  icon?: React.ReactNode;
}

export interface FetchDetailOptions
  extends FetchQueryOptions<any, unknown, any, string[]> {
  queryKey: string[];
  apiUrl: string;
  customParams?: Record<string, unknown>;
  axiosConfig?: AxiosRequestConfig;
}

export interface FetchListOptions
  extends FetchQueryOptions<any, unknown, any, unknown[]> {
  queryKey: unknown[];
  apiUrl: string;
  customParams?: Record<string, unknown>;
  axiosConfig?: AxiosRequestConfig;
  omitKeys: string[];
}

export enum ROLES {
  PROVIDER,
  CONSUMER,
}

export enum Gender {
  MALE,
  FEMALE,
  UNANSWERED,
}
