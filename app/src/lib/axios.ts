import { API_URL } from '@env';
import Axios, { AxiosError } from 'axios';

export const axios = Axios.create({
  baseURL: API_URL,
});

export type ApiError = AxiosError;
