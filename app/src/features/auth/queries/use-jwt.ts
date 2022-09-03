import { userKeys } from '@/features/user/queries/query-key-factory';
import { axios } from '@/lib/axios';
import * as SecureStore from 'expo-secure-store';
import { useQuery, useQueryClient } from 'react-query';
import { API_JWT_KEY } from '../constants';
import { jwtKeys } from './query-key-factory';

export const useJwt = () => {
  const queryClient = useQueryClient();

  return useQuery(jwtKeys.jwt, {
    queryFn: () => SecureStore.getItemAsync(API_JWT_KEY),
    onSuccess: (jwt) => {
      clearAxiosJwtInterceptor();

      if (!jwt) {
        queryClient.removeQueries(userKeys.all);
        return;
      }

      addAxiosJwtInceptor(jwt);
    },
  });
};

const clearAxiosJwtInterceptor = () => {
  // @ts-ignore
  axios.interceptors.request.handlers = [];
};

const addAxiosJwtInceptor = (jwt: string) => {
  return axios.interceptors.request.use((config) => {
    if (!jwt) return config;

    return {
      ...config,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
  });
};
