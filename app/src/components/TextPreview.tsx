import { ScrollView, Text } from 'native-base';

interface TextPreviewProps {
  text: string;
}

export const TextPreview: React.FC<TextPreviewProps> = ({ text }) => {
  return (
    <ScrollView bg="gray.100" maxH="200">
      <Text p={2}>{text}</Text>
    </ScrollView>
  );
};
