import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Icon, Text } from 'native-base';

export const SearchError = () => {
  return (
    <Box alignSelf="stretch" my={6} textAlign="center">
      <Icon
        as={MaterialCommunityIcons}
        name="alert-circle"
        size={8}
        color="error"
        mx="auto"
      />
      <Text fontSize="sm" textAlign="center">
        An error occurred while searching. Please try again.
      </Text>
      <Text fontSize="xs" textAlign="center">
        If the error persist please contact the support.
      </Text>
    </Box>
  );
};
