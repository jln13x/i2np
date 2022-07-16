import {
  ProcessImageRequest,
  ProcessImageResponse,
} from '@/generated/api/interfaces';
import { ApiError, axios } from '@/lib/axios';
import { useMutation } from 'react-query';

export const useProcessImage = <
  TRequest extends ProcessImageRequest,
  TResponse extends ProcessImageResponse
>() => {
  return useMutation<TResponse, ApiError, TRequest>({
    mutationFn: async ({ base64Image }) => {
      const response = await axios.post<TResponse>('ocr/process-image', {
        base64Image,
      });

      return response.data;
    },
  });
};
