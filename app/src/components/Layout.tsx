import { useUser } from '@/hooks/queries/use-user';
import { Box, Center, Container, Image } from 'native-base';
import React, { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: user } = useUser();

  return (
    <Box mt={8} minH="100%" bg="white">
      <Box py={6}>
        {user?.avatar_url && <Image src={user.avatar_url} alt="Foo" />}
      </Box>
      <Center>
        <Container w="full">{children}</Container>
      </Center>
    </Box>
  );
};
