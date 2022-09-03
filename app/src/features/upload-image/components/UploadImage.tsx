import { Error } from '@/components/states/Error';
import { useSelectedText } from '@/stores/selected-text';
import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { Center, Text, VStack } from 'native-base';
import { useProcessImage } from '../mutations/use-process-image';
import { Processing } from './Processing';
import { ProcessingResult } from './ProcessingResult';
import { UploadImagePressable } from './UploadImagePressable';

const imagePickerOptions: ImagePickerOptions = {
  mediaTypes: MediaTypeOptions.Images,
  quality: 0.5,
  allowsEditing: true,
  base64: true,
};

export const UploadImage = () => {
  const {
    data: processedImage,
    mutate: processImage,
    isError: processingImageFailed,
    reset: resetProcessImage,
    isLoading: isProcessingImage,
  } = useProcessImage();

  const { setSelectedText, setDetectedText, reset, selectedText } =
    useSelectedText();

  const uploadImage = async (type: 'take' | 'select') => {
    const cameraResult =
      type === 'take'
        ? await launchCameraAsync(imagePickerOptions)
        : await launchImageLibraryAsync(imagePickerOptions);

    if (cameraResult.cancelled) return;

    const image = cameraResult.base64;

    if (!image) return;

    processImage(
      {
        base64Image: image,
      },
      {
        onSuccess: ({ detectedText }) => {
          setDetectedText(detectedText);
          setSelectedText(detectedText);
        },
      }
    );
  };

  const handleReset = () => {
    reset();
    resetProcessImage();
  };

  if (processingImageFailed)
    return (
      <Center h="full">
        <Error retry={handleReset} title="Couldn't process your image!" message="Make sure you choose an image with text in it."/>
      </Center>
    );

  if (isProcessingImage)
    return (
      <Center h="full">
        <Processing />
      </Center>
    );

  if (processedImage && selectedText !== undefined)
    return <ProcessingResult selectedText={selectedText} />;

  return (
    <Center h="full">
      <VStack space={8}>
        <UploadImagePressable
          onPress={() => uploadImage('take')}
          icon="camera"
          text="Take a picture"
        />
        <Text
          textAlign="center"
          textTransform="uppercase"
          letterSpacing={2}
          fontSize="lg"
        >
          or...
        </Text>
        <UploadImagePressable
          onPress={() => uploadImage('select')}
          icon="folder"
          text="Select a picture"
        />
      </VStack>
    </Center>
  );
};
