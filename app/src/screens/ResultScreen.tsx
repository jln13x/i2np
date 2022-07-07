import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Icon,
  Link,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import { Linking } from "react-native";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { EditSelectedTextModal } from "../components/EditSelectedTextModal";
import { Layout } from "../components/Layout";
import { TextPreview } from "../components/TextPreview";
import { useAddToPage } from "../hooks/mutations/use-add-to-page";
import { useCreateSubpage } from "../hooks/mutations/use-create-subpage";
import { useAccessToken } from "../hooks/queries/use-access-token";
import { useUser } from "../hooks/queries/use-user";
import { useSelectedResult } from "../hooks/stores/use-selected-result";
import { useSelectedText } from "../hooks/stores/use-selected-text";
import { getTitle } from "../utils/notion/get-title";

export const ResultScreen = () => {
  const { selectedResult } = useSelectedResult();
  const { selectedText } = useSelectedText();
  const { navigate } = useNavigation();
  const { isLoading: isAddingPage, mutate: addTextToPage } = useAddToPage();
  const {
    data: createSubpageResponse,
    isLoading: isCreatingSubpage,
    mutate: createSubpage,
  } = useCreateSubpage();

  if (!selectedResult || !selectedText) {
    navigate("Home");
    return null;
  }

  if (selectedResult.object === "database") {
    return null;
  }

  const title = getTitle(selectedResult, true);

  const addToPage = () => {
    addTextToPage({
      pageId: selectedResult.id,
      text: selectedText,
    });
  };

  const createNewSubpage = () => {
    createSubpage({
      pageId: selectedResult.id,
      text: selectedText,
    });
  };

  const isDisabled = isAddingPage || isCreatingSubpage;

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
            isDisabled={isDisabled}
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
            isDisabled={isDisabled}
            onPress={createNewSubpage}
            isLoading={isCreatingSubpage}
          >
            Create new subpage
          </PrimaryButton>
        </VStack>
        {/* {createSubpageResponse && (
          <Link href={createSubpageResponse.url}>asd</Link>
        )} */}
      </Box>
    </Layout>
  );
};
