import { useMutation } from 'react-query';
import { stringToNotionFormat } from '../../utils/notion/string-to-notion-format';

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
