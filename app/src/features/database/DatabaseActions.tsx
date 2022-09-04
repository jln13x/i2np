import { PrimaryButton } from '@/components/button/PrimaryButton';
import { Container } from '@/components/Container';
import { EditDetectedText } from '@/components/EditDetectedText';
import { Title } from '@/components/Title';
import { SelectedResult } from '@/stores/selected-result';
import { useSelectedText } from '@/stores/selected-text';
import { getTitle } from '@/utils/get-title';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Text, VStack } from 'native-base';
import React from 'react';

interface DatabaseActionsProps {
  database: SelectedResult;
}

export const DatabaseActions: React.FC<DatabaseActionsProps> = ({
  database,
}) => {
  const { navigate } = useNavigation();
  const { selectedText: text } = useSelectedText();

  const { object: type, icon } = database;

  const emoji = icon?.type === 'emoji' ? `${icon.emoji}` : null;
  const title = getTitle(database);

  if (type !== 'database') {
    navigate('SearchPageOrDatabase');
    return null;
  }

  if (text === undefined) {
    navigate('UploadImage');
    return null;
  }

  const handleAddPageToDatabase = () => {
    navigate('CreatePage');
  };

  return (
    <VStack w="full" h="full">
      <Container pt={8}>
        <Text
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="lg"
          color="text.400"
        >
          {type}
        </Text>
        <Title title={title} emoji={emoji} />
      </Container>
      <EditDetectedText />
      <Box py={8}>
        <Text textAlign="center" fontSize="xs" alignSelf="center">
          You will get the link to the page afterwards to add addtional
          properties to it.
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
    </VStack>
  );
};
