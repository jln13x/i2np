import * as SecureStore from 'expo-secure-store';
import { useMutation, useQueryClient } from 'react-query';
import { API_JWT_KEY } from '../constants';
import { jwtKeys } from '../queries/query-key-factory';

export const useSetJwt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jwt: string) => SecureStore.setItemAsync(API_JWT_KEY, jwt),
    onMutate: async (jwt) => {
      await queryClient.cancelQueries({
        queryKey: jwtKeys.jwt,
      });

      queryClient.setQueryData<string | undefined>(jwtKeys.jwt, jwt);
      queryClient.invalidateQueries(jwtKeys.jwt);
    },
  });
};
