import { Spinner } from '@/components/Spinner';
import { Center } from 'native-base';
import { PropsWithChildren } from 'react';
import { useMeQuery } from '../user/queries/use-me-query';
import { AuthenticatedScreens } from './components/screens/AuthenticatedScreens';
import { UnauthenticatedScreens } from './components/screens/UnauthenticatedScreens';

export const AuthenticationLayer: React.FC<PropsWithChildren<{}>> = ({}) => {
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
