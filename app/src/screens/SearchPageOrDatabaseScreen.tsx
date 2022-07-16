import {
  NoResultsFound,
  SearchError,
  SearchResults,
} from '@/features/page-database-search/components';
import { usePageDatabaseSearch } from '@/features/page-database-search/queries/use-page-database-search';
import { useNavigation } from '@react-navigation/native';
import { Box, Input, ScrollView, Text } from 'native-base';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { useDebounce } from '../hooks/use-debounce';
import { useSelectedText } from '../stores/selected-text';

export const SearchPageOrDatabaseScreen = () => {
  const [search, setSearch] = useState('');
  const debounce = useDebounce();
  const {
    data: searchResults,
    isLoading,
    isError,
  } = usePageDatabaseSearch(search);

  const { selectedText } = useSelectedText();
  const { navigate } = useNavigation();

  if (!selectedText) {
    navigate('Image');
    return null;
  }

  const onSearchChange = (value: string) => {
    debounce(() => setSearch(value), 100);
  };

  const results = searchResults?.results;

  return (
    <Layout>
      <Box alignSelf="stretch" h="full" pt={56}>
        <Box w="full">
          <Text fontSize="2xl" textAlign="center">
            Where to put your text?
          </Text>
        </Box>
        <Input
          placeholder="Enter the title of a page or database..."
          _focus={{ borderColor: 'indigo.400', bg: 'gray.50' }}
          onChangeText={onSearchChange}
          rightElement={isLoading ? <Spinner mr={2} /> : undefined}
          mt={8}
        />
        {results && results.length > 0 && (
          <Box mt={8} alignSelf="stretch">
            <Text
              mb={4}
              textTransform="uppercase"
              fontSize="2xs"
              color="dark.200"
            >
              choose a page or database
            </Text>
            <ScrollView w="full" h="xs" maxH="sm" pb={4}>
              <SearchResults results={results} />
            </ScrollView>
          </Box>
        )}

        {results && results.length === 0 && <NoResultsFound />}
        {isError && <SearchError />}
      </Box>
    </Layout>
  );
};
