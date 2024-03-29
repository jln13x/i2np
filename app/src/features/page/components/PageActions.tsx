import { PrimaryButton } from '@/components/button/PrimaryButton';
import { Container } from '@/components/Container';
import { EditDetectedText } from '@/components/EditDetectedText';
import { Error } from '@/components/states/Error';
import { SelectedResult } from '@/stores/selected-result';
import { useSelectedText } from '@/stores/selected-text';
import { getTitle } from '@/utils/get-title';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Center, Icon, ScrollView, Text, VStack } from 'native-base';
import { useAppendToPage } from '../mutations/use-append-to-page';
import { AddToPageSuccess } from './AddToPageSuccess';

interface PageActionsProps {
  page: SelectedResult;
}

export const PageActions: React.FC<PageActionsProps> = ({ page }) => {
  const {
    mutate: appendToPage,
    isLoading: isAppendingToPage,
    isSuccess: appendedToPage,
    isError: appendToPageFailed,
    reset: resetAppendToPage,
  } = useAppendToPage();
  const { navigate } = useNavigation();
  const { object: type, id } = page;

  const title = getTitle(page);

  const { selectedText: text } = useSelectedText();

  if (type !== 'page') {
    navigate('SearchPageOrDatabase');
    return null;
  }

  if (text === undefined) {
    navigate('UploadImage');
    return null;
  }

  const handleAddToPage = () => {
    appendToPage({
      pageId: id,
      text,
    });
  };

  const handleCreateSubpage = () => {
    navigate('CreatePage');
  };

  if (appendedToPage)
    return (
      <Center h="full">
        <AddToPageSuccess url={page.url} />
      </Center>
    );

  if (appendToPageFailed)
    return (
      <Center h="full">
        <Error retry={resetAppendToPage} />
      </Center>
    );

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
        <Text fontSize="2xl">{title}</Text>
      </Container>
      <ScrollView contentContainerStyle={{
        flexGrow: 1

        
      }}>
        <EditDetectedText />
        <Box py={8}>
          <Container>
            <Text textAlign="center" fontSize="xs" alignSelf="center">
              You can choose between adding the text to the currently selected
              page or creating a new sub-page with the text.
            </Text>
            <VStack space={4} alignSelf="center" mt={4}>
              <PrimaryButton
                size="md"
                leftIcon={
                  <Icon as={MaterialCommunityIcons} name="plus" size="lg" />
                }
                onPress={handleAddToPage}
                isDisabled={isAppendingToPage}
                isLoading={isAppendingToPage}
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
                isDisabled={isAppendingToPage}
                onPress={handleCreateSubpage}
              >
                Create new subpage
              </PrimaryButton>
            </VStack>
          </Container>
        </Box>
      </ScrollView>
    </VStack>
  );
};
