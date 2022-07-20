import { PrimaryButton } from '@/components/button/PrimaryButton';
import { EditDetectedText } from '@/components/EditDetectedText';
import { SearchResultResponse } from '@/generated/api/interfaces';
import { useSelectedText } from '@/stores/selected-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Text } from 'native-base';

interface DatabaseActionsProps {
  database: SearchResultResponse;
}

export const DatabaseActions: React.FC<DatabaseActionsProps> = ({
  database,
}) => {
  const { navigate } = useNavigation();
  const { selectedText: text } = useSelectedText();

  const { type, title } = database;

  if (type !== 'database') {
    navigate('SearchPageOrDatabase');
    return null;
  }

  if (!text) {
    navigate('UploadImage');
    return null;
  }

  const handleAddPageToDatabase = () => {
    navigate('CreatePage');
  };

  return (
    <Box w="full">
      <Text
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="lg"
        color="text.400"
      >
        {type}
      </Text>
      <Text fontSize="2xl">{title}</Text>
      <Box alignSelf="stretch" my={6}>
        <EditDetectedText text={text} />
      </Box>
      <Text textAlign="center" fontSize="xs" alignSelf="center">
        You will get the link to the page afterwards to add addtional properties
        to it.
      </Text>
      <PrimaryButton
        mt={4}
        alignSelf="center"
        size="md"
        leftIcon={<Icon as={MaterialCommunityIcons} name="plus" size="lg" />}
        onPress={handleAddPageToDatabase}
      >
        Add page to database
      </PrimaryButton>
    </Box>
  );
};
