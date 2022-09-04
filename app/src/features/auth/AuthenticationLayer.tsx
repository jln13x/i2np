import { Spinner } from '@/components/Spinner';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
} from '@/features/navigation/components';
import { Client } from '@notionhq/client';
import { useIsMutating } from '@tanstack/react-query';
import { Center } from 'native-base';
import { useMeQuery } from '../user/queries/use-me-query';
import { AuthenticatedNotionClientProvider } from './AuthenticatedClientProvider';
import { useAccessToken } from './queries/use-access-token';

export const AuthenticationLayer: React.FC = () => {
  const { data: accessToken } = useAccessToken();
  const isLoggingIn = useIsMutating(['login']);
  const isLoggingOut = useIsMutating(['logout']);

  const { data: me, fetchStatus } = useMeQuery(accessToken || null);

  const isLoadingMe = fetchStatus === 'fetching' && !me;

  if (isLoadingMe || isLoggingIn) {
    return (
      <Center h="full" w="full" bg="indigo.600">
        <Spinner size="large" color="white" />
      </Center>
    );
  }

  if (!me || !accessToken || isLoggingOut) return <UnauthenticatedScreens />;

  const client = new Client({
    auth: accessToken,
  });

  return (
    <AuthenticatedNotionClientProvider client={client}>
      <AuthenticatedScreens />
    </AuthenticatedNotionClientProvider>
  );
};
