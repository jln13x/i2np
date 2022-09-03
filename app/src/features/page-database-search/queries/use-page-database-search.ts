import { SearchResultsResponse } from '@/generated/api/interfaces';
import { axios } from '@/lib/axios';
import { QueryFunctionContext, useQuery } from 'react-query';
import { pageDatabaseSearchKeys } from './query-key-factory';

type QueryFn = QueryFunctionContext<
  ReturnType<typeof pageDatabaseSearchKeys['search']>
>;

const fetchSearchResults = async ({ queryKey }: QueryFn) => {
  const response = await axios.get<SearchResultsResponse>('/notion/search', {
    params: {
      query: queryKey[0].query,
    },
  });
  return response.data;
};

export const usePageDatabaseSearch = (query: string) => {
  return useQuery({
    queryKey: pageDatabaseSearchKeys.search(query),
    enabled: !!query,
    queryFn: fetchSearchResults,
    retry: 0,
  });
};
