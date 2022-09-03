// https://lottiefiles.com/102421-no-search-results
import LottieView from 'lottie-react-native';
import { Box, Center, Flex, Text } from 'native-base';
import noResultsAnimation from '../no-results.animation.json';

export const NoResultsFound: React.FC = () => {
  return (
    <Flex flexGrow={1}>
      <Center alignItems="center" position="relative" py={8}>
        <Text fontSize="md">
          Couldn&apos;t find any{' '}
          <Text color="brand" fontWeight="bold">
            page
          </Text>{' '}
          or{' '}
          <Text color="brand" fontWeight="bold">
            database
          </Text>
          .
        </Text>
        <Text fontSize="sm" mt={1}>
          Please try a different search term.
        </Text>
      </Center>
      <Box position="relative" flex={1}>
        <LottieView autoPlay={true} loop={true} source={noResultsAnimation} />
      </Box>
    </Flex>
  );
};
