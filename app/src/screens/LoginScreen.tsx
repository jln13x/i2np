import { BrandLogo } from '@/components/BrandLogo';
import { NotionButton } from '@/components/button/NotionButton';
import { env } from '@/env';
import { useAuthorize } from '@/features/auth/mutations/use-authorize';
import { createURL } from 'expo-linking';
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

  const loginWithNotionProxyless = async () => {
    const notionResponse = await promptAsync();

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
            <>
              <NotionButton
                text="Login with Notion"
                onPress={loginWithNotion}
              />
              <NotionButton
                text="Login without Proxy"
                onPress={loginWithNotionProxyless}
              />
            </>
          )}
          <Text>{JSON.stringify(env, null, 2)}</Text> 
          <Text>{createURL('asd')}</Text>
        </Box>
      </Center>
    </Layout>
  );
};
