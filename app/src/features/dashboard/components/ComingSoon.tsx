import { Box, Center, Pressable, Text, VStack } from 'native-base';

interface ComingSoonProps {
  title: string;
  description: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
}) => {

  return (
    <Pressable w="full" shadow="6" bg="gray.50">
      <VStack py={2} px={2} flexShrink={1}>
        <Text
          fontSize="md"
          letterSpacing="sm"
          textTransform="uppercase"
          fontWeight="bold"
          w="full"
        >
          {title}
        </Text>
        <Text fontSize="xs" color="text.600">
          {description}
        </Text>
      </VStack>
      <Center w="full" position="absolute" height="full">
        <Center position="relative" w="full" h="full">
          <Text
            color="brand"
            fontSize="xl"
            textTransform="uppercase"
            fontWeight="bold"
            zIndex={2}
          >
            Coming soon
          </Text>
          <Box
            position="absolute"
            w="full"
            h="full"
            bg="white"
            opacity={80}
          ></Box>
        </Center>
      </Center>
    </Pressable>
  );
};
