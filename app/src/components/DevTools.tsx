import { useSelectedResult } from '@/stores/selected-result';
import { useSelectedText } from '@/stores/selected-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Query, QueryStatus, useQueryClient } from '@tanstack/react-query';
import {
  Badge,
  Box,
  Fab,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';

export const DevTools = () => {
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();

  const queryCache = queryClient.getQueryCache();

  const toggleShow = () => setShow((show) => !show);
  const [showStores, setShowStores] = useState(false);

  const env = process.env.NODE_ENV;
  if (env !== 'development') return null;

  const ToggleButton = () => (
    <Fab
      renderInPortal={false}
      shadow={2}
      bg="brand"
      size="sm"
      icon={<Icon color="white" as={MaterialCommunityIcons} name="tools" />}
      onPress={toggleShow}
      _focusVisible={{
        bg: 'brand',
      }}
    />
  );

  if (!show) return <ToggleButton />;

  const toggleStores = () => setShowStores((show) => !show);

  return (
    <Box h="full" w="full" position="absolute" top="0" bg="white" p={4}>
      <Pressable onPress={toggleStores} alignSelf="flex-end" mb={6}>
        <Text textTransform="uppercase">
          {showStores ? 'Show queries' : 'Show stores'}
        </Text>
      </Pressable>
      {showStores ? (
        <Stores />
      ) : (
        <ScrollView>
          <VStack space={4}>
            {queryCache.getAll().map((query) => (
              <SingleQuery key={query.queryHash} query={query} />
            ))}
          </VStack>
        </ScrollView>
      )}
      <ToggleButton />
    </Box>
  );
};

interface SingleQueryProps {
  query: Query;
}

const SingleQuery: React.FC<SingleQueryProps> = ({ query }) => {
  const queryHash = query.queryHash;
  let status: Status = query.state.status;

  const [showKey, setShowKey] = useState(false);
  const [showData, setShowData] = useState(false);

  const toggleShowKey = () => setShowKey((show) => !show);
  const toggleData = () => setShowData((show) => !show);

  const observerCount = query.getObserversCount();

  status = query.isActive() === false ? 'inactive' : status;

  return (
    <VStack space={2}>
      <HStack justifyContent="space-between" alignItems="flex-start" space={8}>
        <HStack flexShrink={1} space={2} alignItems="center">
          <Pressable
            bg="brand"
            rounded="lg"
            p={2}
            flexShrink={1}
            onPress={toggleData}
          >
            <Text w="full" color="white" isTruncated={!showKey}>
              {queryHash}
            </Text>
          </Pressable>
          <Pressable onPress={toggleShowKey}>
            <Icon as={MaterialCommunityIcons} name="chevron-down" size="lg" />
          </Pressable>
        </HStack>
        <HStack space={2}>
          <Badge rounded="full" bg={observerCount > 0 ? 'black' : 'gray.200'}>
            <Text color={observerCount > 0 ? 'white' : 'black'}>
              {observerCount}
            </Text>
          </Badge>
          <Badge colorScheme={colorSchemes[status]}>{status}</Badge>
        </HStack>
      </HStack>
      {showData && (
        <Box bg="gray.100" p={2} w="full" rounded="md">
          {query.state.data && (
            <Text>{JSON.stringify(query.state.data, null, 2)}</Text>
          )}
          {query.state.error && (
            <Text>{JSON.stringify(query.state.error, null, 2)}</Text>
          )}
        </Box>
      )}
    </VStack>
  );
};

type Status = QueryStatus | 'inactive';

const colorSchemes = {
  success: 'emerald',
  idle: 'amber',
  error: 'rose',
  loading: 'indigo',
  inactive: 'gray',
};

const Stores = () => {
  const { selectedResult } = useSelectedResult();
  const { detectedText, selectedText } = useSelectedText();

  return (
    <VStack space={8}>
      <Store
        name="Selected Result"
        data={{
          selectedResult,
        }}
      />
      <Store
        name="Selected Text"
        data={{
          selectedText,
          detectedText,
        }}
      />
    </VStack>
  );
};

interface StoreProps {
  name: string;
  data: unknown;
}

const Store: React.FC<StoreProps> = ({ name, data }) => {
  const [showData, setShowData] = useState(false);
  const toggleShowData = () => setShowData((show) => !show);

  return (
    <VStack space={2}>
      <Pressable
        bg="brand"
        rounded="lg"
        p={2}
        flexShrink={1}
        onPress={toggleShowData}
      >
        <Text w="full" color="white">
          {name}
        </Text>
      </Pressable>
      {showData && (
        <Box bg="gray.100" p={2} w="full" rounded="md">
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </Box>
      )}
    </VStack>
  );
};
