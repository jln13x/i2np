import { Container } from '@/components/Container';
import { TextToPageFeature } from '@/features/dashboard/components/TextToPageFeature';
import { useUser } from '@/features/user/queries/use-user';
import { useNavigation } from '@react-navigation/native';
import { Center, Text, VStack } from 'native-base';
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
        <Container h="full" pt={8}>
          <Text fontSize="4xl" fontWeight={700}>
            Nice to see you, <Text color="brand">{user.name}</Text>
            👋
          </Text>
          <VStack space={6} mt={16}>
            <TextToPageFeature />
          </VStack>
        </Container>
      </Center>
    </Layout>
  );
};

/**
                Detects text in any image and uploads it to Notion as a page.
 * 
 */
