import { Box, HStack, Pressable, Text, VStack } from 'native-base';

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export const Feature: React.FC<FeatureProps> = ({
  title,
  icon,
  description,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} bg="white" shadow="6">
      <HStack alignItems="center" space={2} maxW="full">
        <Box w="1/5" h="full" position="relative">
          {icon}
        </Box>
        <VStack py={4} px={2} flexShrink={1}>
          <Text
            fontSize="lg"
            letterSpacing="md"
            textTransform="uppercase"
            fontWeight="bold"
            w="full"
          >
            {title}
          </Text>
          <Text fontSize="sm" color="text.400">
            {description}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
