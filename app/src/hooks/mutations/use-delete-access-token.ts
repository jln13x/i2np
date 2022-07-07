import * as SecureStore from 'expo-secure-store';
import { useMutation, useQueryClient } from 'react-query';
import {
  ACCESS_TOKEN_KEY,
  queryKey as accessTokenQueryKey,
} from '../queries/use-access-token';

export const useDeleteAccessToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    onSuccess: async () => {
      await queryClient.invalidateQueries(accessTokenQueryKey);
    },
  });
};
