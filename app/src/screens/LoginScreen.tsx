import { BrandLogo } from '@/components/BrandLogo';
import { NotionButton } from '@/components/button/NotionButton';
import { AUTHORIZATION_ENDPOINT, CLIENT_ID, REDIRECT_URI } from '@env';
import { useAuthRequest } from 'expo-auth-session';
import { Box, Button, Center, Text } from 'native-base';
import { Layout } from '../components/Layout';
import { useLogin } from '../features/auth/mutations/use-login';

export const LoginScreen = () => {
  const { mutate: login, isLoading: isLoggingIn } = useLogin();

  const [_, __, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: 'code',
      extraParams: {
        owner: 'user',
      },
    },
    {
      authorizationEndpoint: AUTHORIZATION_ENDPOINT,
    }
  );

  const loginWithNotion = async () => {
    const notionResponse = await promptAsync({
      useProxy: true,
    });

    if (notionResponse?.type !== 'success') return;

    login({ code: notionResponse.params.code });
  };

  return (
    <Layout hideHeader>
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
        <Button onPress={() => login({ code: '123' })}>Force login</Button>
      </Center>
    </Layout>
  );
};
