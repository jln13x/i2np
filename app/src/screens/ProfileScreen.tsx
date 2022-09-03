import { SecondaryButton } from '@/components/button/SecondaryButton';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { useLogout } from '@/features/auth/mutations/use-logout';
import { UserDetails } from '@/features/profile/components/UserDetails';
import { Workspace } from '@/features/profile/components/Workspace';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Divider, Flex, Icon, IconButton, VStack } from 'native-base';

export const ProfileScreen = () => {
  const { mutate: logout } = useLogout();
  const handleLogout = () => logout();
  const { goBack, canGoBack, navigate } = useNavigation();

  const handleClose = () => {
    if (canGoBack()) {
      goBack();
      return;
    }

    navigate('Home');
  };

  return (
    <Layout>
      <Box>
        <Container h="full" pb={8}>
          <Flex alignItems="flex-end" w="full">
            <IconButton
              variant="unstyled"
              onPress={handleClose}
              icon={<Icon as={MaterialCommunityIcons} name="close" />}
            />
          </Flex>
          <VStack justifyContent="space-between" flex={1}>
            <Flex alignItems="center">
              <UserDetails />
              <Divider my={8} />
              <Workspace />
            </Flex>
            <SecondaryButton onPress={handleLogout}>Logout</SecondaryButton>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};
