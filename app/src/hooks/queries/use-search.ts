import { useQuery } from 'react-query';
import {
  GetDatabaseResponse,
  GetPageResponse,
  SearchResponse as NotionSearchResponse,
} from '../../notion-types';
import { useNotionClient } from '../use-notion-client';

export type SearchResponse = Omit<NotionSearchResponse, 'results'> & {
  results: Array<GetPageResponse | GetDatabaseResponse>;
};

export const useSearch = (query: string) => {
  const client = useNotionClient();
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      return (await client.search({
        query,
        page_size: 5,
      })) as SearchResponse;
    },
    enabled: !!query,
  });
};
