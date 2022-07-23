import { userKeys } from '@/features/user/queries/query-key-factory';
import { LoginRequest } from '@/generated/api/interfaces';
import { useReset } from '@/hooks/use-reset';
import { ApiError, axios } from '@/lib/axios';
import { useMutation, useQueryClient } from 'react-query';
import { useSetJwt } from './use-set-jwt';

export const useLogin = () => {
  const { mutate: setJwt } = useSetJwt();
  const queryClient = useQueryClient();
  const reset = useReset();

  return useMutation<string, ApiError, LoginRequest>({
    mutationKey: 'login',
    mutationFn: async ({ code }) => {
      const response = await axios.post(`/auth/login`, {
        code,
      });

      return response.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(userKeys.all);
    },
    onSuccess: async (jwt) => {
      await reset();
      setJwt(jwt);
    },
  });
};
