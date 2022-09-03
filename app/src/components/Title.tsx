import { Text } from 'native-base';

interface TitleProps {
  title: string;
  emoji: string | null;
}

export const Title: React.FC<TitleProps> = ({ title, emoji }) => {
  return (
    <Text fontSize="2xl">
      {emoji ? `${emoji} ` : ''}
      {title}
    </Text>
  );
};
