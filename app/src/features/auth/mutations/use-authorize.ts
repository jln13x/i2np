import { env } from '@/env';
import { useAuthRequest } from 'expo-auth-session';

export const useAuthorize = () => {

  const [_, __, promptAsync] = useAuthRequest(
    {
      clientId: env.NOTION_CLIENT_ID,
      redirectUri: env.NOTION_REDIRECT_URI,
      responseType: 'code',
      extraParams: {
        owner: 'user',
      },
    },
    {
      authorizationEndpoint: env.NOTION_AUTHORIZATION_ENDPOINT,
    }
  );

  return {
    promptAsync,
  };
};
