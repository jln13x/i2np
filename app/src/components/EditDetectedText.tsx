import { useSelectedText } from '@/stores/selected-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';
import { Container } from './Container';
import { Textarea } from './Textarea';

export const EditDetectedText = () => {
  const { selectedText, detectedText, setSelectedText } = useSelectedText();

  const handleRevertChanges = () => {
    detectedText && setSelectedText(detectedText);
  };

  const isDirty = selectedText !== detectedText;

  if (selectedText === undefined) return null;

  return (
    <Box flex={1}>
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
        <Text fontSize="xs">Revert all your changes</Text>
      </Button>
      <Box flex={1} bg="gray.100">
        <Container>
          <Textarea
            py={2}
            h="full"
            value={selectedText}
            rounded="md"
            onChangeText={setSelectedText}
          />
        </Container>
      </Box>
    </Box>
  );
};
