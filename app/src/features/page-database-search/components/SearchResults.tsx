import { SearchResultsResponse } from '@/generated/api/interfaces';
import { VStack } from 'native-base';
import React from 'react';
import { SearchResult } from './SearchResult';

interface SearchResultsProps {
  results: SearchResultsResponse['results'];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <VStack alignSelf="stretch" space={4}>
      {results.map((result) => (
        <SearchResult key={result.id} result={result} />
      ))}
    </VStack>
  );
};
