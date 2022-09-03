import { MaterialIcons } from '@expo/vector-icons';
import { Icon, Text, VStack } from 'native-base';
import { PropsWithChildren } from 'react';

export const ProcessingError: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <VStack alignItems="center" px={12} textAlign="center">
      <Icon as={MaterialIcons} name="error" color="rose.600" size="lg" />
      <Text fontSize="lg" fontWeight="light" mt={4} textAlign="center">
        An error occured while processing your image.
      </Text>
      {children}
    </VStack>
  );
};
