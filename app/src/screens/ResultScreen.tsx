import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Icon,
  Link,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import { Linking } from 'react-native';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { EditSelectedTextModal } from '../components/EditSelectedTextModal';
import { Layout } from '../components/Layout';
import { TextPreview } from '../components/TextPreview';
import { useAddToPage } from '../hooks/mutations/use-add-to-page';
import { useSelectedResult } from '../stores/selected-result';
import { useSelectedText } from '../stores/selected-text';
import { getTitle } from '../utils/notion/get-title';

export const ResultScreen = () => {
  const { selectedResult } = useSelectedResult();
  const { selectedText } = useSelectedText();
  const { navigate } = useNavigation();
  const { isLoading: isAddingPage, mutate: addTextToPage } = useAddToPage();

  if (!selectedResult || !selectedText) {
    navigate('Home');
    return null;
  }

  if (selectedResult.object === 'database') {
    return null;
  }

  const title = getTitle(selectedResult, true);

  const addToPage = () => {
    addTextToPage({
      pageId: selectedResult.id,
      text: selectedText,
    });
  };

  const redirectToCreateSubpage = () => {
    navigate('CreateSubpage');
    return;
  };

  return (
    <Layout>
      <Text fontSize="xl">{title}</Text>
      <Box alignSelf="stretch" my={6}>
        <EditSelectedTextModal />
        <TextPreview text={selectedText} />
      </Box>
      <Box mt={8}>
        <Text textAlign="center" fontSize="xs" alignSelf="center">
          You can choose between adding the text to the currently selected page
          or creating a new sub-page with the text.
        </Text>
        <VStack space={4} w="3/6" alignSelf="center" mt={4}>
          <PrimaryButton
            size="md"
            leftIcon={
              <Icon as={MaterialCommunityIcons} name="plus" size="lg" />
            }
            onPress={addToPage}
            isDisabled={isAddingPage}
            isLoading={isAddingPage}
          >
            Add to page
          </PrimaryButton>
          <PrimaryButton
            size="md"
            leftIcon={
              <Icon
                as={MaterialCommunityIcons}
                name="text-box-multiple-outline"
              />
            }
            isDisabled={isAddingPage}
            onPress={redirectToCreateSubpage}
          >
            Create new subpage
          </PrimaryButton>
        </VStack>
      </Box>
    </Layout>
  );
};
