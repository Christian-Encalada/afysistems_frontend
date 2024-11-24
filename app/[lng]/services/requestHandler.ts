import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTenantId } from '@/utils/getTenantId';

const tenantId = getTenantId();

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-id': tenantId,
  },
});

export const get = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.get(url, config);
};

export const post = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.post(url, data, config);
};

export const postForm = async (
  url: string,
  data?: FormData,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.post(url, data, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data', ...config?.headers },
  });
};

export const put = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.put(url, data, config);
};

export const patch = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.patch(url, data, config);
};

export const patchForm = async (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.patch(url, data, {
    ...config,
    headers: { 'Content-Type': 'multipart/form-data', ...config?.headers },
  });
};

export const del = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => {
  return instance.delete(url, config);
};
