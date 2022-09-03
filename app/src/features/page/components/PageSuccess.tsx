import { PrimaryButton } from '@/components/button/PrimaryButton';
import { OpenInNotion } from '@/components/OpenInNotion';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Box, Text, VStack } from 'native-base';
import { useEffect, useRef } from 'react';
import animation from '../success-animation.json';

interface CreateSubpageSuccessProps {
  pageUrl: string;
  text: string;
}

export const PageSuccess: React.FC<CreateSubpageSuccessProps> = ({
  pageUrl,
  text,
}) => {
  const { navigate } = useNavigation();

  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play(20, 60);
  }, []);

  const navigateHome = () => {
    navigate('Home');
  };

  return (
    <VStack alignItems="center">
      <Box h="300" w="300">
        <LottieView
          ref={animationRef}
          source={animation}
          autoPlay={false}
          loop={false}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </Box>
      <Text fontSize="xl" mt="-10" mb={12}>
        {text}
      </Text>
      <OpenInNotion url={pageUrl} />
      <PrimaryButton onPress={navigateHome} mt={8}>
        Return to Dashboard
      </PrimaryButton>
    </VStack>
  );
};
