import { useLogout } from '@/features/auth/mutations/use-logout';
import { Box, Button, Center, Flex, HStack } from 'native-base';
import React, { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { mutate: logout } = useLogout();

  const handleLogout = () => logout();

  return (
    <Flex minH="full" bg="white">
      <HStack py={2} justifyContent="flex-end">
        <Button onPress={handleLogout} size="xs" variant="ghost">
          Logout
        </Button>
      </HStack>
      <Box flex={1} display="flex" px={4}>
        <Center flex={1}>{children}</Center>
      </Box>
    </Flex>
  );
};
