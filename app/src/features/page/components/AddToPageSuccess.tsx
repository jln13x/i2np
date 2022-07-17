import { OpenInNotion } from '@/components/OpenInNotion';
import LottieView from 'lottie-react-native';
import { Box, Text, VStack } from 'native-base';
import { useEffect, useRef } from 'react';
import animation from '../add-to-page-success-animation.json';

export const AddToPageSuccess = () => {
  const animationRef = useRef<LottieView>(null);
  useEffect(() => {
    animationRef.current?.play(20, 60);
  }, []);

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
        Successfully added to page
      </Text>
      <OpenInNotion href="tba" />
    </VStack>
  );
};
