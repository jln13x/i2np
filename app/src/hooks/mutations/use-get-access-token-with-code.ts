import { API_URL } from "@env";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

interface Variables {
  code: string;
}

export const useGetAccessTokenWithCode = <TData = string>() => {
  return useMutation<TData, AxiosError, Variables>({
    mutationFn: async ({ code }) => {
      const response = await axios.get<TData>(
        `${API_URL}/notion/access-token?code=${code}`,
        {
          timeout: 3000,
        }
      );

      return response.data;
    },
    retry: 0,
  });
};
