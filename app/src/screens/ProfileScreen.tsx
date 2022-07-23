import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SecondaryButton } from '@/components/button/SecondaryButton';
import { Container } from '@/components/Container';
import { Layout } from '@/components/Layout';
import { useAuthorize } from '@/features/auth/mutations/use-authorize';
import { useLogin } from '@/features/auth/mutations/use-login';
import { useLogout } from '@/features/auth/mutations/use-logout';
import { UserDetails } from '@/features/profile/components/UserDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
} from 'native-base';

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

  const { promptAsync } = useAuthorize();
  const { mutate: login } = useLogin();

  const handleChangePermission = async () => {
    const res = await promptAsync({
      useProxy: true,
    });

    if (res?.type !== 'success') return;

    login({ code: res.params.code });
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
              <Text color="text.400" fontSize="xs" mb={1}>
                Choose which pages and databases are allowed to be used by this
                app.
              </Text>
              <PrimaryButton onPress={handleChangePermission}>
                Change permissions
              </PrimaryButton>
            </Flex>

            <SecondaryButton onPress={handleLogout}>Logout</SecondaryButton>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};
