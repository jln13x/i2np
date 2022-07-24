import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SecondaryButton } from '@/components/button/SecondaryButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Box, Text, VStack } from 'native-base';
// https://lottiefiles.com/90569-error
import animation from './error-animation.json';

interface ErrorProps {
  retry: () => void;
  title?: string;
  message?: string;
}

const DEFAULT_TITLE = 'Oh no! Something went wrong.';
const DEFAULT_MSG = 'Please tr^y again.';

export const Error: React.FC<ErrorProps> = ({ retry, title, message }) => {
  const { navigate } = useNavigation();

  const navigateHome = () => {
    navigate('Home');
  };

  const handleRetry = () => {
    retry();
  };

  return (
    <VStack alignItems="center">
      <Box h="40">
        <LottieView
          source={animation}
          autoPlay={true}
          loop={false}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </Box>
      <Text fontSize="xl">{title || DEFAULT_TITLE}</Text>
      <Text fontSize="md">{message || DEFAULT_MSG}</Text>
      <VStack>
        <PrimaryButton onPress={handleRetry} mt={8}>
          Try again
        </PrimaryButton>
        <SecondaryButton onPress={navigateHome} mt={4}>
          Return to Dashboard
        </SecondaryButton>
      </VStack>
      <Text fontSize="xs" mt={12}>
        If the error persist please contact the support.
      </Text>
    </VStack>
  );
};
