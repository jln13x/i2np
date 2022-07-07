import { HStack, Icon, Box, Text, Flex, Pressable } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  CustomGetDatabaseResponseDetailed,
  CustomGetPageResponseDetailed,
  EmojiRequest,
} from '../../notion-types';
import { useSelectedResult } from '../../stores/selected-result';
import { useNavigation } from '@react-navigation/native';

interface SearchResultProps {
  title: string;
  emoji?: EmojiRequest;
}

interface Database {
  type: 'database';
  data: CustomGetDatabaseResponseDetailed;
}

interface Page {
  type: 'page';
  data: CustomGetPageResponseDetailed;
}

export const SearchResult: React.FC<SearchResultProps & (Database | Page)> = ({
  type,
  title,
  emoji,
  data,
}) => {
  const iconName = type === 'database' ? 'database' : 'file-document';

  const { setSelectedResult } = useSelectedResult();
  const { navigate } = useNavigation();

  const onSearchResultPress = () => {
    setSelectedResult(data);
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
          <Box p={1.5} bg="indigo.600" rounded="full">
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
