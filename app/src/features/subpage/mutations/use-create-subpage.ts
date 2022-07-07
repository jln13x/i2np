import axios from 'axios';
import { useMutation } from 'react-query';
import {
  stringToNotionFormat,
  toNotionTitle,
} from '../../../utils/notion/string-to-notion-format';
import { useNotionClient } from '../../../hooks/use-notion-client';

interface CreateSubpageParams {
  pageId: string;
  text: string;
  title: string;
}

export const useCreateSubpage = () => {
  const client = useNotionClient();

  return useMutation<unknown, unknown, CreateSubpageParams>({
    mutationFn: ({ pageId, text, title }) => {
      const textInNotionFormat = stringToNotionFormat(text);

      return client.pages.create({
        parent: {
          type: 'page_id',
          page_id: pageId,
        },
        properties: {
          title: toNotionTitle(title),
        },
        children: textInNotionFormat,
      });
    },
  });
};
