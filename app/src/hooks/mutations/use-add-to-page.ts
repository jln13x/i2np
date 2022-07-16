import { CreatePageRequest } from '@/generated/api/interfaces';
import { ApiError, axios } from '@/lib/axios';
import { useMutation } from 'react-query';

export const useAddToPage = () => {
  return useMutation<unknown, ApiError, CreatePageRequest>({
    mutationFn: (data) => axios.post('/notion/pages', data),
  });
};
