import { Avatar } from '@/components/Avatar';
import { useUser } from '@/features/user/queries/use-user';
import { Box, Flex, Text } from 'native-base';

export const UserDetails = () => {
  const { email, name } = useUser();

  return (
    <Box>
      <Avatar letter={name.charAt(0)} size="large" />

      <Flex w="full" alignItems="center" mt={6}>
        <Text fontSize="xl">{name}</Text>
        <Text fontSize="md" color="text.400">
          {email}
        </Text>
      </Flex>
    </Box>
  );
};
