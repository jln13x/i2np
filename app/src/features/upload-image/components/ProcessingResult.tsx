import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SecondaryButton } from '@/components/button/SecondaryButton';
import { Textarea } from '@/components/Textarea';
import { useSelectedText } from '@/stores/selected-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, HStack, Icon, Text, VStack } from 'native-base';
import React, { useRef } from 'react';

interface ProcessingResultProps {
  selectedText: string;
  goBack: () => void;
}

export const ProcessingResult: React.FC<ProcessingResultProps> = ({
  selectedText,
  goBack,
}) => {
  const detectedText = useRef<string>(selectedText);
  const { setSelectedText } = useSelectedText();
  const { navigate } = useNavigation();

  const isDirty = selectedText !== detectedText.current;

  const handleRevertChanges = () => {
    setSelectedText(detectedText.current);
  };

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
      <Box minH="xs" maxH="md">
        <Button
          opacity={isDirty ? 1 : 0}
          disabled={!isDirty}
          display="flex"
          ml="auto"
          variant="ghost"
          onPress={handleRevertChanges}
          p={1}
          _pressed={{
            bg: 'none',
          }}
          leftIcon={
            <Icon
              as={MaterialCommunityIcons}
              name="undo"
              color="black"
              size="xs"
            />
          }
        >
          <Text fontSize="xs">Revert your changes</Text>
        </Button>
        <Box flex={1}>
          <Textarea
            h="full"
            value={selectedText}
            bg="gray.100"
            rounded="md"
            p={2}
            shadow="2"
            onChangeText={setSelectedText}
          />
        </Box>
      </Box>

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
