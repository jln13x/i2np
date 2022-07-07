import { Button, IButtonProps, Text } from 'native-base';
import { NotionIcon } from '../NotionIcon';

interface NotionButtonProps extends IButtonProps {
  text: string;
}

export const NotionButton: React.FC<NotionButtonProps> = ({
  text,
  ...props
}) => {
  return (
    <Button leftIcon={<NotionIcon />} variant="outline" {...props}>
      <Text color="black">{text}</Text>
    </Button>
  );
};
