import { useAuthenticatedNotionClient } from '@/features/auth/AuthenticatedClientProvider';
import { ApiError } from '@/lib/axios';
import { textToNotionParagraphs } from '@/utils/text-to-notion-paragraphs';
import { useMutation } from '@tanstack/react-query';

interface Request {
  pageId: string;
  text: string;
}

export const useAppendToPage = () => {
  const { client } = useAuthenticatedNotionClient();

  return useMutation<unknown, ApiError, Request>({
    mutationFn: (data) => {
      const formatted = textToNotionParagraphs(data.text);

      return client.blocks.children.append({
        block_id: data.pageId,
        children: formatted,
      });
    },
  });
};
