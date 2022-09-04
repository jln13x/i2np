import { useQuery } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { accessTokenKeys } from './query-key-factory';

export const useAccessToken = () => {
  return useQuery(accessTokenKeys.accessToken, {
    queryFn: () => SecureStore.getItemAsync('access-token'),
  });
};
