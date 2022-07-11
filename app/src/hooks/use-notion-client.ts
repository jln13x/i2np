import { Client } from '@notionhq/client';
import { useAccessToken } from './queries/use-access-token';

export const useNotionClient = () => {
  const { data: token } = useAccessToken();

  if (!token) {
    throw new Error('No token found!');
  }

  return new Client({});
};
