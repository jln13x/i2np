import { Spinner } from '@/components/Spinner';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
} from '@/features/navigation/components';
import { Center } from 'native-base';
import { PropsWithChildren } from 'react';
import { useMeQuery } from '../user/queries/use-me-query';

export const AuthenticationLayer: React.FC<PropsWithChildren<unknown>> = () => {
  const { data: me, isLoading: isLoadingMe } = useMeQuery();

  if (isLoadingMe) {
    return (
      <Center h="full" w="full" bg="indigo.600">
        <Spinner size="large" />
      </Center>
    );
  }

  if (!me) return <UnauthenticatedScreens />;

  return <AuthenticatedScreens />;
};
