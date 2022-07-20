import { useLogout } from '@/features/auth/mutations/use-logout';
import { Box, Button, Flex, Text } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { Container } from './Container';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { mutate: logout } = useLogout();

  const handleLogout = () => logout();

  return (
    <Flex minH="full" flex={1} safeArea={true} bg="pink.300">
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="12"
        bg="pink.400"
        flexDir="row"
      >
        <Text>Dashboard</Text>
        <Button onPress={handleLogout} size="xs" variant="ghost">
          Logout
        </Button>
      </Container>
      <Box flex={1} bg="white">
        {children}
      </Box>
    </Flex>
  );
};
