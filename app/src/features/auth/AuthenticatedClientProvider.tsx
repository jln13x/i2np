import { useContext } from '@/hooks/use-context';
import type { Client } from '@notionhq/client';
import { createContext } from 'react';

interface AuthenticatedNotionClientContextProps {
  client: Client;
}

const AuthenticatedNotionClientContext = createContext<
  AuthenticatedNotionClientContextProps | undefined
>(undefined);

interface Props {
  client: Client;
  children: React.ReactNode;
}

export const AuthenticatedNotionClientProvider = ({
  client,
  children,
}: Props) => {
  return (
    <AuthenticatedNotionClientContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </AuthenticatedNotionClientContext.Provider>
  );
};

export const useAuthenticatedNotionClient = () => {
  return useContext(AuthenticatedNotionClientContext);
};
