import { API_URL } from '@env';
import axios, { AxiosError } from 'axios';
import { useMutation } from 'react-query';

interface ExchangeGrantInput {
  code: string;
}

interface ExchangeGrantResponse {
  jwt: string;
}

export const useExchangeGrant = () => {
  return useMutation<ExchangeGrantResponse, AxiosError, ExchangeGrantInput>({
    mutationFn: async ({ code }) => {
      const response = await axios.post(`${API_URL}/auth/login`, {
        code,
      });

      return response.data;
    },
  });
};
