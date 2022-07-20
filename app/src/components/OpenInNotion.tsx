import { Button, Text } from 'native-base';
import React from 'react';
import { Linking } from 'react-native';
import { NotionIcon } from './NotionIcon';

interface OpenInNotionProps {
  url: string;
}

export const OpenInNotion: React.FC<OpenInNotionProps> = ({ url }) => {
  const handleOpenInNotion = async () => {
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) return;

    await Linking.openURL(url);
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
