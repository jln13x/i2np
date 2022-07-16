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
    <Button leftIcon={<NotionIcon />} variant="outline" {...props} p={3}>
      <Text color="black" textTransform="uppercase" letterSpacing="xl">
        {text}
      </Text>
    </Button>
  );
};
