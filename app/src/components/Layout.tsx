import { ACCESS_TOKEN_KEY, queryKey } from '@/hooks/queries/use-access-token';
import * as SecureStore from 'expo-secure-store';
import { Box, Center, Container } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { useQueryClient } from 'react-query';
import { PrimaryButton } from './button/PrimaryButton';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();

  const logout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    queryClient.invalidateQueries(queryKey);
  };

  return (
    <Box mt={8} minH="100%" bg="white">
      <Box py={6}>
        <PrimaryButton onPress={logout}>Logout</PrimaryButton>
      </Box>
      <Center>
        <Container w="full">{children}</Container>
      </Center>
    </Box>
  );
};
