import { Flex } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { DevTools } from './DevTools';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Flex flex={1} bg="white" position="relative" safeArea>
        {children}
      </Flex>
      <DevTools />
    </>
  );
};
