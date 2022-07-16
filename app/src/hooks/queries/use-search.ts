import { useQuery } from 'react-query';
import {
  GetDatabaseResponse,
  GetPageResponse,
  SearchResponse as NotionSearchResponse,
} from '../../lib/notion/types';

export type SearchResponse = Omit<NotionSearchResponse, 'results'> & {
  results: Array<GetPageResponse | GetDatabaseResponse>;
};

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    // queryFn: async () => {
    //   return (await client.search({
    //     query,
    //     page_size: 5,
    //   })) as SearchResponse;
    // },
    enabled: !!query,
  });
};
