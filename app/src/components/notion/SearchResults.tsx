import { VStack } from 'native-base';
import React from 'react';
import {
  CustomGetDatabaseResponseDetailed,
  CustomGetPageResponseDetailed,
  SearchResponse,
} from '../../lib/notion/types';
import { isDetailedDatabase } from '../../utils/notion/is-detailed-database';
import { isDetailedPage } from '../../utils/notion/is-detailed-page';
import { DatabaseResult } from './DatabaseResult';
import { PageResult } from './PageResult';

interface SearchResultsProps {
  results: SearchResponse['results'];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const filteredResults = results.filter((result) =>
    result.object === 'page'
      ? isDetailedPage(result)
      : isDetailedDatabase(result)
  ) as (CustomGetPageResponseDetailed | CustomGetDatabaseResponseDetailed)[];

  return (
    <VStack alignSelf="stretch" space={4}>
      {filteredResults.map((result) =>
        result.object === 'database' ? (
          <DatabaseResult database={result} key={result.id} />
        ) : (
          <PageResult page={result} key={result.id} />
        )
      )}
    </VStack>
  );
};
