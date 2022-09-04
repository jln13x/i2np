import { Client } from '@notionhq/client';
import { useQuery } from '@tanstack/react-query';
import { userKeys } from './query-key-factory';

export const useMeQuery = (token: string | null) => {
  return useQuery({
    queryKey: userKeys.token(token || ''),
    queryFn: () => {
      if (!token) return null;

      const client = new Client({ auth: token });
      return client.users.me({});
    },
    refetchInterval: 10000,
    retry: 0,
    enabled: !!token,
  });
};
