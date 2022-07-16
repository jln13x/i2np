import { SearchResultResponse } from '@/generated/api/interfaces';
import { useSelectedResult } from '@/stores/selected-result';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, HStack, Icon, Pressable, Text } from 'native-base';
import React from 'react';

interface SearchResultProps {
  result: SearchResultResponse;
}

export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  const { type, emoji, title } = result;

  const iconName = type === 'database' ? 'database' : 'file-document';

  const { setSelectedResult } = useSelectedResult();
  const { navigate } = useNavigation();

  const onSearchResultPress = () => {
    setSelectedResult(result);
    navigate('Result');
  };

  return (
    <Pressable onPress={onSearchResultPress}>
      {({ isPressed }) => (
        <HStack
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.300"
          rounded="lg"
          py={4}
          px={2}
          alignItems="center"
          space={2}
          bg={isPressed ? 'gray.100' : 'white'}
        >
          <Box p={1.5} bg="brand" rounded="full">
            <Icon
              as={MaterialCommunityIcons}
              name={iconName}
              size="md"
              color="white"
            />
          </Box>
          <Box flexShrink={1}>
            <Text
              fontSize="2xs"
              textTransform="uppercase"
              letterSpacing="lg"
              color="text.400"
            >
              {type}
            </Text>
            <Text isTruncated>
              {emoji && `${emoji} `}
              {title}
            </Text>
          </Box>
        </HStack>
      )}
    </Pressable>
  );
};
