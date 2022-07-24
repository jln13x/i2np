import { PrimaryButton } from '@/components/button/PrimaryButton';
import { useAuthorize } from '@/features/auth/mutations/use-authorize';
import { useLogin } from '@/features/auth/mutations/use-login';
import { useUser } from '@/features/user/queries/use-user';
import { Box, HStack, Text } from 'native-base';

const DEFAULT_WORKSPACE_NAME = 'My workspace';

export const Workspace = () => {
  const { promptAsync } = useAuthorize();
  const { mutate: login } = useLogin();
  const { workspace } = useUser();

  const { name } = workspace;

  const workspaceName = name || DEFAULT_WORKSPACE_NAME;

  const handleChangePermission = async () => {
    const res = await promptAsync({
      useProxy: true,
    });

    if (res?.type !== 'success') return;
    login({ code: res.params.code });
  };

  return (
    <Box>
      <HStack space={1} alignItems="center">
        <Text fontWeight="medium">Current workspace:</Text>
        <Text>{workspaceName}</Text>
      </HStack>
      <HStack space={2} alignItems="center">
        <Text color="text.400" fontSize="xs" mb={1}>
          Reauthorize which workspace (aswell as pages and databases) are
          allowed to be used by this app.
        </Text>
      </HStack>
      <PrimaryButton
        onPress={handleChangePermission}
        mt={2}
        alignSelf="flex-start"
      >
        Reauthorize
      </PrimaryButton>
    </Box>
  );
};
