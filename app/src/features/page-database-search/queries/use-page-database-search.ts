import { useAuthenticatedNotionClient } from '@/features/auth/AuthenticatedClientProvider';
import { useQuery } from '@tanstack/react-query';
import { pageDatabaseSearchKeys } from './query-key-factory';

export const usePageDatabaseSearch = (query: string) => {
  const { client } = useAuthenticatedNotionClient();

  return useQuery({
    queryKey: pageDatabaseSearchKeys.search(query),
    enabled: !!query,
    queryFn: () =>
      client.search({
        page_size: 3,
        query,
      }),
    retry: 0,
  });
};
