import { NotionButton } from '@/components/button/NotionButton';
import { AUTHORIZATION_ENDPOINT, CLIENT_ID, REDIRECT_URI } from '@env';
import { useAuthRequest } from 'expo-auth-session';
import { Text } from 'native-base';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useGetAccessTokenWithCode } from '../hooks/mutations/use-get-access-token-with-code';
import { useSetAccessToken } from '../hooks/mutations/use-set-access-token';

export const LoginScreen = ({}) => {
  const {
    data: accessToken,
    mutate: getAccessToken,
    isLoading: isGettingAccessToken,
    error,
  } = useGetAccessTokenWithCode();

  const { mutate: setAccessToken, isLoading: isSettingAccessToken } =
    useSetAccessToken();

  const [_, response, promptAsync] = useAuthRequest(
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
    await promptAsync({
      useProxy: true,
    });
  };

  useEffect(() => {
    if (accessToken || isGettingAccessToken || error) return;
    if (response?.type !== 'success') return;

    getAccessToken({ code: response.params.code });
  }, [response]);

  useEffect(() => {
    if (!accessToken || isSettingAccessToken) return;
    setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <Layout>
      <NotionButton text="Login with Notion" />
      {isGettingAccessToken && (
        <Text
          fontSize="lg"
          textTransform="uppercase"
          letterSpacing="lg"
          fontWeight="light"
          mt={4}
        >
          Logging you in...
        </Text>
      )}
    </Layout>
  );
};
