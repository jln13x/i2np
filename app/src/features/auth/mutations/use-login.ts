import { LoginRequest } from '@/generated/api/interfaces';
import { ApiError } from '@/lib/axios';
import { useMutation } from 'react-query';
import { useSetJwt } from './use-set-jwt';

const jwty =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDVrMzFlc2owMzI0bWNhM3prd2Z0aDkyIiwiaWF0IjoxNjU4Mzc2ODE2fQ.3ckqktY2B30XSdzH7iajlxigjRlVfiblv2ZlEQ7mGFc';

export const useLogin = () => {
  const { mutate: setJwt } = useSetJwt();

  return useMutation<string, ApiError, LoginRequest>({
    mutationFn: async ({ code }) => {
      return new Promise((resolve) => setTimeout(resolve, 500));
      // const response = await axios.post(`/auth/login`, {
      //   code,
      // });

      // return response.data;
    },
    onSuccess: (jwt) => {
      setJwt(jwty);
    },
  });
};
