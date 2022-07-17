import { Button, Text } from 'native-base';
import React from 'react';
import { NotionIcon } from './NotionIcon';

interface OpenInNotionProps {
  href: string;
}

export const OpenInNotion: React.FC<OpenInNotionProps> = ({ href }) => {
  const handleOpenInNotion = () => {
    console.log('open in notion');
  };

  return (
    <Button
      variant="outline"
      onPress={handleOpenInNotion}
      leftIcon={<NotionIcon />}
    >
      <Text>Open in Notion</Text>
    </Button>
  );
};
