import { Container } from '@/components/Container';
import { NotionIcon } from '@/components/NotionIcon';
import { useUser } from '@/features/user/queries/use-user';
import { useNavigation } from '@react-navigation/native';
import { Center, HStack, Pressable, Text, VStack } from 'native-base';
import { Layout } from '../components/Layout';

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const user = useUser();

  const navigateToImageScreen = () => {
    navigate('UploadImage');
  };

  return (
    <Layout>
      <Center h="full">
        <Container>
          <Text fontSize="4xl" fontWeight={700}>
            Nice to see you, <Text color="brand">{user.name}</Text>
            👋
          </Text>
          <VStack space={6} mt={8}>
            <Pressable
              onPress={navigateToImageScreen}
              bg="white"
              py={4}
              px={4}
              shadow="6"
            >
              <HStack alignItems="center" space={4}>
                <NotionIcon />
                <Text
                  fontSize="lg"
                  letterSpacing="md"
                  textTransform="uppercase"
                  color="brand"
                  fontWeight="bold"
                >
                  Image Processor
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.400" fontWeight="light">
                Detects text in any image and uploads it to Notion as a page.
              </Text>
            </Pressable>
            <Pressable
              onPress={navigateToImageScreen}
              bg="white"
              py={4}
              px={4}
              shadow="6"
            >
              <HStack alignItems="center" space={4}>
                <NotionIcon />
                <Text
                  fontSize="lg"
                  letterSpacing="md"
                  textTransform="uppercase"
                  color="brand"
                  fontWeight="bold"
                >
                  Image Processor
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.400" fontWeight="light">
                Detects text in any image and uploads it to Notion as a page.
              </Text>
            </Pressable>
            <Pressable
              onPress={navigateToImageScreen}
              bg="white"
              py={4}
              px={4}
              shadow="6"
            >
              <HStack alignItems="center" space={4}>
                <NotionIcon />
                <Text
                  fontSize="lg"
                  letterSpacing="md"
                  textTransform="uppercase"
                  color="brand"
                  fontWeight="bold"
                >
                  Image Processor
                </Text>
              </HStack>
              <Text fontSize="sm" color="gray.400" fontWeight="light">
                Detects text in any image and uploads it to Notion as a page.
              </Text>
            </Pressable>
          </VStack>
        </Container>
      </Center>
    </Layout>
  );
};
