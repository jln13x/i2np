import { Spinner } from '@/components/Spinner';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
} from '@/features/navigation/components';
import { Center } from 'native-base';
import { PropsWithChildren } from 'react';
import { useMeQuery } from '../user/queries/use-me-query';
import { useJwt } from './queries/use-jwt';

export const AuthenticationLayer: React.FC<PropsWithChildren> = () => {
  const { data: jwt } = useJwt();
  const { data: me, isLoading: isLoadingMe } = useMeQuery(jwt);

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
