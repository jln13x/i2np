import { userKeys } from '@/features/user/queries/query-key-factory';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQueryClient } from 'react-query';
import { API_JWT_KEY } from '../constants';
import { jwtKeys } from '../queries/query-key-factory';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => SecureStore.deleteItemAsync(API_JWT_KEY),
    onMutate: async () => {
      await queryClient.cancelQueries(jwtKeys.jwt);
    },
    onSuccess: async () => {
      queryClient.resetQueries(jwtKeys.jwt);
      queryClient.resetQueries(userKeys.me);
    },
  });
};
