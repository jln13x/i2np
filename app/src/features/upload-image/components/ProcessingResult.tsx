import { PrimaryButton } from '@/components/button/PrimaryButton';
import { Container } from '@/components/Container';
import { EditDetectedText } from '@/components/EditDetectedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, ScrollView, Text, VStack } from 'native-base';
import React from 'react';

interface ProcessingResultProps {
  selectedText: string;
}

export const ProcessingResult: React.FC<ProcessingResultProps> = ({
  selectedText,
}) => {
  const { navigate } = useNavigation();

  const handleTextApproved = () => {
    navigate('SearchPageOrDatabase');
  };

  return (
    <VStack h="full">
      <Container>
        <Text fontSize="2xl" letterSpacing="lg">
          Detected text in your image!
        </Text>
        <Text fontSize="xs" color="dark.400" mt={4}>
          You are now able to double-check the text aswell as modifying it if
          needed.
        </Text>
      </Container>
      <ScrollView
        flex={1}
        contentContainerStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <EditDetectedText />
        <Box>
          <Container>
            <HStack justifyContent="flex-end" py={8}>
              <PrimaryButton
                rightIcon={
                  <Icon as={MaterialCommunityIcons} name="arrow-right" />
                }
                onPress={handleTextApproved}
                isDisabled={selectedText === ''}
              >
                Looks good
              </PrimaryButton>
            </HStack>
          </Container>
        </Box>
      </ScrollView>
    </VStack>
  );
};
