import { BrandLogo } from '@/components/BrandLogo';
import { NotionButton } from '@/components/button/NotionButton';
import { PrimaryButton } from '@/components/button/PrimaryButton';
import { useAuthorize } from '@/features/auth/mutations/use-authorize';
import { Box, Center, Text } from 'native-base';
import { Layout } from '../components/Layout';
import { useLogin } from '../features/auth/mutations/use-login';

export const LoginScreen = () => {
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const { promptAsync } = useAuthorize();

  const loginWithNotion = async () => {
    const notionResponse = await promptAsync({
      useProxy: true,
    });

    if (notionResponse?.type !== 'success') return;

    login({ code: notionResponse.params.code });
  };

  return (
    <Layout>
      <Center w="full" h="full">
        <BrandLogo />
        <Box mt={16}>
          {isLoggingIn ? (
            <Text
              fontSize="lg"
              textTransform="uppercase"
              letterSpacing="lg"
              fontWeight="light"
              mt={4}
            >
              Logging you in...
            </Text>
          ) : (
            <NotionButton text="Login with Notion" onPress={loginWithNotion} />
          )}
        </Box>
        <PrimaryButton mt={8} onPress={() => login({ code: '123' })}>
          Force login
        </PrimaryButton>
      </Center>
    </Layout>
  );
};
