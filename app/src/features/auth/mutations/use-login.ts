import { ApiError, axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { accessTokenKeys } from '../queries/query-key-factory';

interface LoginInput {
  code: string;
}

interface Response {
  accessToken: string;
}

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation<Response, ApiError, LoginInput>({
    mutationKey: ['login'],
    mutationFn: async ({ code }) => {
      const response = await axios.post(`/login`, {
        code,
      });
      return response.data;
    },
    onSuccess: ({ accessToken }) => {
      SecureStore.setItemAsync('access-token', accessToken);
      qc.invalidateQueries(accessTokenKeys.accessToken);
    },
  });
};
