import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SecondaryButton } from '@/components/button/SecondaryButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Box, Text, VStack } from 'native-base';
// https://lottiefiles.com/90569-error
import animation from './error-animation.json';

interface ErrorProps {
  retry: () => void;
}

export const Error: React.FC<ErrorProps> = ({ retry }) => {
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
      <Text fontSize="xl">Oh no! Something went wrong.</Text>
      <Text fontSize="md">Please try again.</Text>

      <PrimaryButton onPress={handleRetry} mt={8}>
        Try again
      </PrimaryButton>
      <SecondaryButton onPress={navigateHome} mt={4}>
        Return to Dashboard
      </SecondaryButton>
      <Text fontSize="xs" mt={12}>
        If the error persist please contact the support.
      </Text>
    </VStack>
  );
};
