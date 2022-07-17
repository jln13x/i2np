import LottieView from 'lottie-react-native';
import { Box, Text, VStack } from 'native-base';
// https://lottiefiles.com/108979-image-scanning-finding-searching
import animation from '../proccesing-animation.json';

export const Processing = () => {
  return (
    <VStack alignItems="center">
      <Box w="200" h="200">
        <LottieView
          source={animation}
          autoPlay={true}
          loop={true}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </Box>
      <Text
        fontSize="lg"
        textTransform="uppercase"
        letterSpacing="lg"
        fontWeight="light"
      >
        Processing your image
      </Text>
      <Text fontSize="xs" letterSpacing="sm" fontWeight="light">
        This may take a while depending on the size.
      </Text>
    </VStack>
  );
};
