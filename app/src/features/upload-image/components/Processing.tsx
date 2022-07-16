import { Spinner, Text, VStack } from 'native-base';

export const Processing = () => {
  return (
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
};
