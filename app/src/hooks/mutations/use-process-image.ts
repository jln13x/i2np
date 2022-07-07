import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { API_URL } from "@env";
import { useToast, Alert } from "native-base";

interface ProcessImageRequest {
  image: string;
}

interface ProcessImageResponse extends Response {}

export const useProcessImage = <
  TRequest extends ProcessImageRequest,
  TResponse extends ProcessImageResponse
>() => {
  return useMutation<TResponse, AxiosError, TRequest>({
    mutationFn: async ({ image }) => {
      const response = await axios.post<TResponse>(
        `${API_URL}/ocr/process-image`,
        {
          base64Image: image,
        }
      );

      return response.data;
    },
  });
};

// Remove copy pasta
export interface Vertex {
  x: number;
  y: number;
}

interface TextNode {
  text: string;
  confidence?: number;
  vertices: Vertex[];
}

export interface Response {
  textNodes: TextNode[];
  detectedText: string;
}
