import { env } from '@/env';
import Axios, { AxiosError } from 'axios';

export const axios = Axios.create({
  baseURL: env.API_URL,
});

export type ApiError = AxiosError;
