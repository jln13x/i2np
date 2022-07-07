import axios from 'axios';
import { useMutation } from 'react-query';
import { stringToNotionFormat } from '../../utils/notion/string-to-notion-format';
import { useNotionClient } from '../use-notion-client';

interface AddToPageParams {
  pageId: string;
  text: string;
}

export const useAddToPage = () => {
  const client = useNotionClient();

  return useMutation<unknown, unknown, AddToPageParams>({
    mutationFn: ({ pageId, text }) => {
      const formatted = stringToNotionFormat(text);

      return client.blocks.children.append({
        block_id: pageId,
        children: formatted,
      });
    },
  });
};
