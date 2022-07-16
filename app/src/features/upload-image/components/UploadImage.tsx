import { PrimaryButton } from '@/components/button/PrimaryButton';
import { useSelectedText } from '@/stores/selected-text';
import {
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { Text, VStack } from 'native-base';
import { useProcessImage } from '../mutations/use-process-image';
import { Processing } from './Processing';
import { ProcessingError } from './ProcessingError';
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

  const { selectedText, setSelectedText } = useSelectedText();

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
          setSelectedText(detectedText);
        },
      }
    );
  };

  const handleReset = () => {
    setSelectedText(undefined);
    resetProcessImage();
  };

  if (processingImageFailed)
    return (
      <ProcessingError>
        <PrimaryButton
          variant="outline"
          colorScheme="indigo"
          mt={4}
          onPress={handleReset}
        >
          Retry
        </PrimaryButton>
      </ProcessingError>
    );

  if (isProcessingImage) return <Processing />;

  if (processedImage && selectedText) {
    return (
      <ProcessingResult goBack={handleReset} selectedText={selectedText} />
    );
  }

  return (
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
  );
};
