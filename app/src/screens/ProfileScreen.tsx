import { PrimaryButton } from '@/components/button/PrimaryButton';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { useLogout } from '@/features/auth/mutations/use-logout';
import { UserDetails } from '@/features/profile/components/UserDetails';
import { Box, VStack } from 'native-base';

export const ProfileScreen = () => {
  const { mutate: logout } = useLogout();
  const handleLogout = () => logout();

  return (
    <Layout>
      <Box py={10}>
        <Container h="full">
          <VStack justifyContent="space-between" h="full">
            <UserDetails />
            <PrimaryButton onPress={handleLogout}>Logout</PrimaryButton>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};
