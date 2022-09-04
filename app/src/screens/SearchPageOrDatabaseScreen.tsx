import { Container } from '@/components/Container';
import { Error } from '@/components/states/Error';
import {
  NoResultsFound,
  SearchResults,
} from '@/features/page-database-search/components';
import { usePageDatabaseSearch } from '@/features/page-database-search/queries/use-page-database-search';
import { useNavigation } from '@react-navigation/native';
import { Center, Input, ScrollView, Text, VStack } from 'native-base';
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
    isError: isSearchError,
    remove: resetSearch,
    fetchStatus
  } = usePageDatabaseSearch(search);

  const { selectedText } = useSelectedText();
  const { navigate } = useNavigation();

  const isLoading = fetchStatus === "fetching";

  if (selectedText === undefined) {
    navigate('UploadImage');
    return null;
  }

  const onSearchChange = (value: string) => {
    debounce(() => setSearch(value), 100);
  };

  const results = searchResults?.results;

  const handleReset = () => {
    setSearch('');
    resetSearch();
  };

  if (isSearchError) {
    return (
      <Layout>
        <Center h="full">
          <Error retry={handleReset} />;
        </Center>
      </Layout>
    );
  }


  return (
    <Layout>
      <Container>
        <VStack h="full">
          <VStack alignItems="center" justifyContent="center" pt={12}>
            <Text fontSize="2xl" textAlign="center">
              Where to put your text?
            </Text>
            <Input
              placeholder="Enter the title of a page or database..."
              _focus={{ borderColor: 'indigo.400', bg: 'gray.50' }}
              onChangeText={onSearchChange}
              rightElement={isLoading ? <Spinner mr={2} /> : undefined}
              mt={8}
            />
          </VStack>

          {results && results?.length > 0 && (
            <VStack mt={8} flex={1}>
              <Text textTransform="uppercase" fontSize="xs" color="dark.200">
                choose a page or database
              </Text>
              <ScrollView
                mt={1}
                contentContainerStyle={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <SearchResults results={results} />
                <Text fontSize="2xs" color="dark.400" mt={1} py={4} bg="white">
                  Showing only the top 3 matches
                </Text>
              </ScrollView>
            </VStack>
          )}

          {results && results.length === 0 && <NoResultsFound />}
        </VStack>
      </Container>
    </Layout>
  );
};
