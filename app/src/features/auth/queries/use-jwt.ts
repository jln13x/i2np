import { axios } from '@/lib/axios';
import * as SecureStore from 'expo-secure-store';
import { useRef } from 'react';
import { useQuery } from 'react-query';
import { API_JWT_KEY } from '../constants';
import { jwtKeys } from './query-key-factory';

export const useJwt = () => {
  const interceptorId = useRef<number>();

  return useQuery(jwtKeys.jwt, {
    queryFn: () => SecureStore.getItemAsync(API_JWT_KEY),
    onSuccess: (jwt) => {
      // Interceptor has been set already and the jwt was removed
      if (!jwt && interceptorId.current !== undefined) {
        axios.interceptors.request.eject(interceptorId.current);
        interceptorId.current = undefined;
      }

      // Interceptor has not been set yet and the jwt was added
      if (jwt && interceptorId.current === undefined) {
        interceptorId.current = addAxiosJwtInceptor(jwt);
      }
    },
  });
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
