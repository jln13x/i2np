import { CreatePageResponse } from '@/lib/notion';
import {
  stringToNotionFormat,
  toNotionTitle,
} from '@/utils/notion/string-to-notion-format';
import { useMutation } from 'react-query';

interface CreateSubpageParams {
  pageId: string;
  text: string;
  title: string;
}

export const useCreateSubpage = () => {
  return useMutation<CreatePageResponse, unknown, CreateSubpageParams>({
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
