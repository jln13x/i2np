import { PrimaryButton } from '@/components/button/PrimaryButton';
import { EditDetectedText } from '@/components/EditDetectedText';
import { SearchResultResponse } from '@/generated/api/interfaces';
import { useAddToPage } from '@/hooks/mutations/use-add-to-page';
import { useSelectedText } from '@/stores/selected-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Text, VStack } from 'native-base';

interface PageActionsProps {
  page: SearchResultResponse;
}

export const PageActions: React.FC<PageActionsProps> = ({ page }) => {
  const { mutate: addToPage, isLoading: isAddingPage } = useAddToPage();
  const { navigate } = useNavigation();
  const { title, type, id } = page;
  const { selectedText: text } = useSelectedText();

  if (type !== 'page') {
    navigate('SearchPageOrDatabase');
    return null;
  }

  if (!text) {
    navigate('UploadImage');
    return null;
  }

  const handleAddToPage = () => {
    addToPage({
      pageId: id,
      text,
    });
  };

  return (
    <Box>
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
            onPress={handleAddToPage}
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
            // onPress={redirectToCreateSubpage}
          >
            Create new subpage
          </PrimaryButton>
        </VStack>
      </Box>
    </Box>
  );
};
