import { userKeys } from '@/features/user/queries/query-key-factory';
import { useReset } from '@/hooks/use-reset';
import * as SecureStore from 'expo-secure-store';
import { useMutation, useQueryClient } from 'react-query';
import { API_JWT_KEY } from '../constants';
import { jwtKeys } from '../queries/query-key-factory';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const reset = useReset();

  return useMutation({
    mutationFn: () => SecureStore.deleteItemAsync(API_JWT_KEY),
    onMutate: async () => {
      await queryClient.cancelQueries(jwtKeys.jwt);
      await queryClient.cancelQueries(userKeys.all);
    },
    onSettled: async () => {
      await reset();
    },
  });
};
