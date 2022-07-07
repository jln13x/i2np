import { Center, Container, Heading, Text } from 'native-base';
import React, { PropsWithChildren } from 'react';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Center mt={8} minH="100%" bg="white">
      <Container w="full">{children}</Container>
    </Center>
  );
};
