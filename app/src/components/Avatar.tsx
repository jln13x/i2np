import { Flex, Text } from 'native-base';

interface AvatarProps {
  letter: string;
  size?: 'small' | 'large';
}

export const Avatar: React.FC<AvatarProps> = ({ letter, size = 'small' }) => {
  return (
    <Flex
      rounded="full"
      bg="gray.200"
      alignItems="center"
      alignSelf="center"
      justifyContent="center"
      style={{
        aspectRatio: 1 / 1,
      }}
      py={size === 'small' ? 2 : 4}
    >
      <Text fontWeight="bold" fontSize={size === 'small' ? 'md' : 'lg'}>
        {letter}
      </Text>
    </Flex>
  );
};
