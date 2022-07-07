import { useMutation } from 'react-query';
import { useNotionClient } from '../use-notion-client';

export const useCreatePage = () => {
  const client = useNotionClient();

  return useMutation({
    mutationFn: () => {
      return client.pages.create({
        parent: {
          database_id: '98f61e0366814cadbad77d720e1f5786',
          //   type: "page_id",
          //   page_id: "49ac22d8f387422c899c8867e8f8649a",
        },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: 'Tuscan Kale',
                },
              },
            ],
          },
        },
        children: [
          {
            object: 'block',
            type: 'heading_2',
            heading_2: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: 'Lacinato kale',
                  },
                },
              ],
            },
          },
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content:
                      'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
                    link: {
                      url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
                    },
                  },
                },
              ],
            },
          },
        ],
      });
    },
  });
};
