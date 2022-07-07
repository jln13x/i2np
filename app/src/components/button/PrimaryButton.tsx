import { Button, IButtonProps } from 'native-base';

export const PrimaryButton: React.FC<IButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <Button colorScheme="indigo" variant="solid" {...props}>
      {children}
    </Button>
  );
};
