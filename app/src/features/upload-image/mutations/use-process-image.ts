import { ApiError, axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

interface Request {
  image: string;
}
interface Response {
  detectedText: string;
}

export const useProcessImage = () => {
  return useMutation<Response, ApiError, Request>({
    mutationFn: async ({ image }) => {
      const response = await axios.post('ocr/process-image', {
        image,
      });
 
      return response.data;
    },
  });
};
