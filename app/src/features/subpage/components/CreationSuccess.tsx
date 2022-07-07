import { NotionButton } from '@/components/button/NotionButton';
import { Box, Link, Text } from 'native-base';
import React from 'react';

interface CreationSuccessProps {
  url: string;
}

export const CreationSuccess: React.FC<CreationSuccessProps> = ({ url }) => {
  return (
    <Box>
      <Text>Yey!</Text>
      <Text></Text>
      <Link href={url}>Open in Notion</Link>
      {url && <NotionButton text="Open in Notion" />}
    </Box>
  );
};
