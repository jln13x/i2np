import { LoginRequest } from '@/generated/api/interfaces';
import { ApiError, axios } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useSetJwt } from './use-set-jwt';

export const useLogin = () => {
  const { mutate: setJwt } = useSetJwt();

  return useMutation<string, ApiError, LoginRequest>({
    mutationFn: async ({ code }) => {
      const response = await axios.post(`/auth/login`, {
        code,
      });

      return response.data;
    },
    onSuccess: (jwt) => {
      setJwt(jwt);
    },
  });
};
