import { useAuthenticatedNotionClient } from '@/features/auth/AuthenticatedClientProvider';
import { textToNotionParagraphs } from '@/utils/text-to-notion-paragraphs';
import { textToNotionTitle } from '@/utils/text-to-notion-title';
import { Client, isFullPage } from '@notionhq/client';
import { useMutation } from '@tanstack/react-query';

interface Request {
  parentId: string;
  parentType: 'page' | 'database';
  text: string;
  title: string;
}

export const useCreatePage = () => {
  const { client } = useAuthenticatedNotionClient();

  return useMutation({
    mutationFn: async ({
      parentId,
      parentType,
      text,
      title: passedTitle,
    }: Request) => {
      const children = textToNotionParagraphs(text);
      const title = textToNotionTitle(passedTitle);

      // split up because of weird types from the notion sdk
      const response =
        parentType === 'page'
          ? await createForPageParent(client, parentId, title, children)
          : await createForDatabaseParent(client, parentId, title, children);

      if (!isFullPage(response)) {
        return Promise.reject('Missing page data');
      }

      return {
        url: response.url,
      };
    },
  });
};

const createForPageParent = (
  client: Client,
  parentId: string,
  title: ReturnType<typeof textToNotionTitle>,
  children: ReturnType<typeof textToNotionParagraphs>
) => {
  return client.pages.create({
    parent: {
      page_id: parentId,
      type: 'page_id',
    },
    properties: {
      title,
    },
    children,
  });
};

const createForDatabaseParent = (
  client: Client,
  parentId: string,
  title: ReturnType<typeof textToNotionTitle>,
  children: ReturnType<typeof textToNotionParagraphs>
) => {
  return client.pages.create({
    parent: {
      database_id: parentId,
      type: 'database_id',
    },
    properties: {
      title,
    },
    children,
  });
};
