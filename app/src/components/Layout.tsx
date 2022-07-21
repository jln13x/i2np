import { Flex } from 'native-base';
import React, { PropsWithChildren } from 'react';

interface LayoutProps {
  hideHeader?: boolean;
}

export const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({
  children,
}) => {
  return (
    <Flex flex={1} bg="white" position="relative" safeArea>
      {children}
    </Flex>
  );
};
