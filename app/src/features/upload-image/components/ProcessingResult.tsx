import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SecondaryButton } from '@/components/button/SecondaryButton';
import { EditDetectedText } from '@/components/EditDetectedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, Text, VStack } from 'native-base';
import React from 'react';

interface ProcessingResultProps {
  selectedText: string;
  goBack: () => void;
}

export const ProcessingResult: React.FC<ProcessingResultProps> = ({
  selectedText,
  goBack,
}) => {
  const { navigate } = useNavigation();

  const handleTextApproved = () => {
    navigate('SearchPageOrDatabase');
  };

  return (
    <VStack w="full" space={8} h="full" justifyContent="center">
      <Box>
        <Text fontSize="2xl" letterSpacing="lg">
          Detected text in your image!
        </Text>
        <Text fontSize="xs" color="dark.400" mt={4}>
          You are now able to double-check the text aswell as modifying it if
          needed.
        </Text>
      </Box>

      <EditDetectedText text={selectedText} />

      <HStack justifyContent="space-between">
        <SecondaryButton
          leftIcon={<Icon as={MaterialCommunityIcons} name="arrow-left" />}
          onPress={goBack}
        >
          Go back
        </SecondaryButton>
        <PrimaryButton
          rightIcon={<Icon as={MaterialCommunityIcons} name="arrow-right" />}
          onPress={handleTextApproved}
        >
          Looks good
        </PrimaryButton>
      </HStack>
    </VStack>
  );
};
