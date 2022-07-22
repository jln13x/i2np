import { Container } from '@/components/Container';
import { ImageTextSearchFeature } from '@/features/dashboard/components/ImageTextSearchFeature';
import { ScanToPageFeature } from '@/features/dashboard/components/ScanToPageFeature';
import { TextToPageFeature } from '@/features/dashboard/components/TextToPageFeature';
import { useUser } from '@/features/user/queries/use-user';
import { Center, Text, VStack } from 'native-base';
import { Layout } from '../components/Layout';

export const HomeScreen = () => {
  const user = useUser();

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
          <VStack space={6} mt={24}>
            <ImageTextSearchFeature />
            <ScanToPageFeature />
          </VStack>
        </Container>
      </Center>
    </Layout>
  );
};
