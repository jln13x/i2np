import { Client } from '@notionhq/client';
import { useQuery } from 'react-query';
import { useAccessToken } from './use-access-token';

export const useUser = () => {
  const { data: token } = useAccessToken();

  return useQuery({
    queryKey: 'user',
    queryFn: async () => {
      if (!token) return;

      const client = new Client({
        auth: token,
      });

      await new Promise((res) => setTimeout(res, 4000));

      return await client.users.me({});
    },
  });
};
