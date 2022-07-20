import { CreatePageRequest } from '@/generated/api/interfaces/create-page-request';
import { CreatePageResponse } from '@/generated/api/interfaces/create-page-response';
import { axios } from '@/lib/axios';
import { useMutation } from 'react-query';

export const useCreatePage = () => {
  return useMutation<CreatePageResponse, unknown, CreatePageRequest>({
    mutationFn: async (data) => {
      const response = await axios.post('/notion/pages', data);
      return response.data;
    },
  });
};
