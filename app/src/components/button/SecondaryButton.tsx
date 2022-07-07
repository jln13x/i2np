import { Button, IButtonProps } from 'native-base';

export const SecondaryButton: React.FC<IButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button colorScheme="indigo" variant="outline" {...props}>
      {children}
    </Button>
  );
};
