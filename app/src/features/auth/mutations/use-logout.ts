import { userKeys } from '@/features/user/queries/query-key-factory';
import { useReset } from '@/hooks/use-reset';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { accessTokenKeys } from '../queries/query-key-factory';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const reset = useReset();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: () => SecureStore.deleteItemAsync('access-token'),
    onMutate: async () => {
      await queryClient.cancelQueries(accessTokenKeys.accessToken);
      await queryClient.cancelQueries(userKeys.all);
    },
    onSettled: async () => {
      await reset();
    },
  });
};
