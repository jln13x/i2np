import { NotionIcon } from '@/components/NotionIcon';
import { useUser } from '@/features/user/queries/use-user';
import { useNavigation } from '@react-navigation/native';
import { HStack, Pressable, Text } from 'native-base';
import React from 'react';
import { Layout } from '../components/Layout';

export const HomeScreen = () => {
  const { navigate } = useNavigation();
  const user = useUser();

  const navigateToImageScreen = () => {
    navigate('Image');
  };

  return (
    <Layout>
      <Text fontSize="4xl" fontWeight={700}>
        Nice to see you, <Text color="brand">{user.name}</Text>
        👋
      </Text>
      <Pressable
        mt={16}
        onPress={navigateToImageScreen}
        bg="white"
        py={4}
        px={4}
        shadow="6"
      >
        <HStack alignItems="center" space={4}>
          <NotionIcon />
          <Text
            fontSize="lg"
            letterSpacing="md"
            textTransform="uppercase"
            color="brand"
            fontWeight="bold"
          >
            Image Processor
          </Text>
        </HStack>
        <Text fontSize="sm" color="gray.400" fontWeight="light">
          Detects text in any image and uploads it to Notion as a page.
        </Text>
      </Pressable>
    </Layout>
  );
};
