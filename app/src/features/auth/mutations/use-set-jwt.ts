import * as SecureStore from 'expo-secure-store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_JWT_KEY } from '../constants';
import { jwtKeys } from '../queries/query-key-factory';

export const useSetJwt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: 'set-jwt',
    mutationFn: (jwt: string) => SecureStore.setItemAsync(API_JWT_KEY, jwt),
    onSuccess: () => {
      queryClient.invalidateQueries(jwtKeys.jwt);
    },
  });
};
