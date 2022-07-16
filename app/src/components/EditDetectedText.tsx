import { useSelectedText } from '@/stores/selected-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';
import { useRef } from 'react';
import { Textarea } from './Textarea';

interface EditDetectedTextProps {
  text: string;
}

export const EditDetectedText: React.FC<EditDetectedTextProps> = ({ text }) => {
  const detectedText = useRef<string>(text);
  const { setSelectedText } = useSelectedText();

  const handleRevertChanges = () => {
    setSelectedText(detectedText.current);
  };

  const isDirty = text !== detectedText.current;

  return (
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
          value={text}
          bg="gray.100"
          rounded="md"
          p={2}
          shadow="2"
          onChangeText={setSelectedText}
        />
      </Box>
    </Box>
  );
};
