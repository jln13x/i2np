import { Feather, MaterialIcons } from "@expo/vector-icons";
import { GetSelfResponse } from "@notionhq/client/build/src/api-endpoints";
import { useNavigation } from "@react-navigation/native";
import {
  ImageInfo,
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { Box, Button, Flex, HStack, Icon, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/button/PrimaryButton";
import { SecondaryButton } from "../components/button/SecondaryButton";
import { EditSelectedTextModal } from "../components/EditSelectedTextModal";
import { Layout } from "../components/Layout";
import { Spinner } from "../components/Spinner";
import { Textarea } from "../components/Textarea";
import { TextPreview } from "../components/TextPreview";
import { useProcessImage } from "../hooks/mutations/use-process-image";
import { useUser } from "../hooks/queries/use-user";
import { useSelectedText } from "../hooks/stores/use-selected-text";

const imagePickerOptions: ImagePickerOptions = {
  mediaTypes: MediaTypeOptions.Images,
  quality: 0.5,
  allowsEditing: true,
  base64: true,
};

export const ImageScreen = () => {
  const { data: user } = useUser();
  const [image, setImage] = useState<ImageInfo | null>(null);
  const {
    data: processedImage,
    mutate: processImage,
    isError: processingImageFailed,
    reset: resetProcessImage,
    isLoading: isProcessingImage,
  } = useProcessImage();
  const { navigate } = useNavigation();

  const { selectedText, setSelectedText } = useSelectedText();

  useEffect(() => {
    if (!processedImage) return;
    setSelectedText(processedImage.detectedText);
  }, [processedImage]);

  const handleImageProcessing = (image: string) => {
    processImage({ image });
  };

  useEffect(() => {
    if (!image || !image.base64) return;
    handleImageProcessing(image.base64);
  }, [image]);

  const username = getUsername(user);

  const takePicture = async () => {
    const cameraResult = await launchCameraAsync(imagePickerOptions);

    if (cameraResult.cancelled) return;

    setImage(cameraResult);
  };

  const selectPicture = async () => {
    const libraryResult = await launchImageLibraryAsync(imagePickerOptions);

    if (libraryResult.cancelled) return;

    setImage(libraryResult);
  };

  const goToNotionScreen = () => {
    navigate("Notion");
  };

  const goBack = () => {
    resetProcessImage();
    setSelectedText(undefined);
  };

  const retry = () => {
    resetProcessImage();
  };

  if (selectedText) {
    // Count line breaks in detected text
    return (
      <Layout>
        <Text fontSize="sm" letterSpacing="lg">
          We were able to detect the following text:
        </Text>
        <Box alignSelf="stretch" mt={6}>
          <EditSelectedTextModal />
          <TextPreview text={selectedText} />
        </Box>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={8}
          w="full"
        >
          <SecondaryButton
            onPress={goBack}
            leftIcon={<Icon as={Feather} name="arrow-left" />}
          >
            Back
          </SecondaryButton>
          <PrimaryButton
            onPress={goToNotionScreen}
            rightIcon={<Icon as={Feather} name="arrow-right" />}
          >
            Looks good
          </PrimaryButton>
        </HStack>
      </Layout>
    );
  }

  const Error = () => (
    <VStack alignItems="center" px={12} textAlign="center">
      <Icon as={MaterialIcons} name="error" color="rose.600" size="lg" />
      <Text fontSize="lg" fontWeight="light" mt={4} textAlign="center">
        An error occured while processing your image.
      </Text>
      <PrimaryButton
        variant="outline"
        colorScheme="indigo"
        mt={4}
        onPress={retry}
      >
        Retry
      </PrimaryButton>
    </VStack>
  );

  const Processing = () => (
    <VStack alignItems="center">
      <Spinner size="lg" />
      <Text
        fontSize="lg"
        textTransform="uppercase"
        letterSpacing="lg"
        fontWeight="light"
        mt={4}
      >
        Processing your picture
      </Text>
    </VStack>
  );

  const TakeOrSelectPicture = () => (
    <VStack space={4}>
      <Button
        colorScheme="indigo"
        variant="solid"
        display="flex"
        onPress={takePicture}
        leftIcon={<Icon as={Feather} size="sm" name="camera" />}
      >
        Take a picture
      </Button>
      <Text textAlign="center" textTransform="uppercase" letterSpacing={2}>
        or...
      </Text>
      <Button
        variant="solid"
        colorScheme="indigo"
        justifyContent="center"
        alignItems="center"
        display="flex"
        onPress={selectPicture}
        leftIcon={<Icon as={Feather} size="sm" name="folder" />}
      >
        Select a picture
      </Button>
    </VStack>
  );

  return (
    <Layout>
      <Flex>
        <Box>
          <Text fontSize="xl" fontWeight={700}>
            {username ? `Welcome ${username}!` : "Welcome!"}
          </Text>
          <Text fontSize="sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            magnam quibusdam temporibus tenetur error molestiae dolor ex iusto
            vitae mollitia!
          </Text>
        </Box>
        <Box alignItems="center" justifyContent="center" mt={32}>
          {isProcessingImage && <Processing />}
          {processingImageFailed && <Error />}
          {!isProcessingImage && !processingImageFailed && (
            <TakeOrSelectPicture />
          )}
        </Box>
      </Flex>
    </Layout>
  );
};

const getUsername = (data?: GetSelfResponse): string | null => {
  if (
    data &&
    data.type == "bot" &&
    data.bot.owner.type === "user" &&
    data.bot.owner.user.object === "user"
  ) {
    // @ts-ignore
    const name = data.bot.owner.user.name;

    if (name) return name;
  }

  return null;
};
