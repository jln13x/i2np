import { AppendToPageRequest } from '@/generated/api/interfaces';
import { ApiError, axios } from '@/lib/axios';
import { useMutation } from 'react-query';

export const useAppendToPage = () => {
  return useMutation<unknown, ApiError, AppendToPageRequest>({
    mutationFn: (data) => axios.post('/notion/pages/append', data),
  });
};
