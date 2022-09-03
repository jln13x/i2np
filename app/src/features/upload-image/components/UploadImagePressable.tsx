import { Feather } from '@expo/vector-icons';
import { HStack, Icon, Pressable, Text } from 'native-base';

interface UploadImagePressableProps {
  onPress: () => void;
  icon: string;
  text: string;
}

export const UploadImagePressable: React.FC<UploadImagePressableProps> = ({
  onPress,
  icon,
  text,
}) => {
  return (
    <Pressable onPress={onPress} bg="brand" rounded="md" px={4} py={6}>
      <HStack alignItems="center" space="4">
        <Icon as={Feather} size="xl" name={icon} color="white" />
        <Text color="white" fontSize="xl">
          {text}
        </Text>
      </HStack>
    </Pressable>
  );
};
