import { Box, Text } from "native-base";

export const NoResultsFound: React.FC = () => {
  return (
    <Box alignSelf="stretch" my={6}>
      <Text textAlign="center" fontSize="xs" alignSelf="center">
        Couldn't find any page or database.
      </Text>
    </Box>
  );
};
