import { useNavigation } from '@react-navigation/native';
import { Box, Input, Text } from 'native-base';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { NoResultsFound } from '../components/NoResultsFound';
import { SearchResults } from '../components/notion/SearchResults';
import { Spinner } from '../components/Spinner';
import { useSearch } from '../hooks/queries/use-search';
import { useDebounce } from '../hooks/use-debounce';
import { useSelectedText } from '../stores/selected-text';

export const NotionScreen = ({}) => {
  const [search, setSearch] = useState('');
  const debounce = useDebounce();
  const {
    data: searchResponse,
    isLoading,
    isSuccess: searchIsSuccess,
  } = useSearch(search);
  const { selectedText } = useSelectedText();
  const { navigate } = useNavigation();

  if (!selectedText) {
    navigate('Image');
    return null;
  }

  const onSearchChange = (value: string) => {
    debounce(() => setSearch(value), 100);
  };

  const searchResults = searchResponse?.results.length
    ? searchResponse.results
    : null;

  return (
    <Layout>
      <Input
        placeholder="Search for a page or database..."
        _focus={{ borderColor: 'indigo.400', bg: 'gray.50' }}
        onChangeText={onSearchChange}
        rightElement={isLoading ? <Spinner mr={2} /> : undefined}
      />
      {searchResults && (
        <Box mt={8} alignSelf="stretch">
          <Text
            mb={2}
            textTransform="uppercase"
            fontSize="2xs"
            color="text.600"
          >
            choose a page or database
          </Text>
          <SearchResults results={searchResults} />
        </Box>
      )}
      {searchIsSuccess && !searchResults && <NoResultsFound />}
    </Layout>
  );
};
