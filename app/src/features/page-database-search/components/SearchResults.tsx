import type { SearchResponse } from '@notionhq/client/build/src/api-endpoints';
import { VStack } from 'native-base';
import React from 'react';
import { SearchResult } from './SearchResult';

interface SearchResultsProps {
  results: SearchResponse['results'];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <VStack space={4}>
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </VStack>
  );
};
