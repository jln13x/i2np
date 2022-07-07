import { IInputProps, Input as NBInput } from 'native-base';

export const Input: React.FC<IInputProps> = (props) => {
  return (
    <NBInput
      _focus={{
        bg: 'gray.100',
        borderColor: 'indigo.400',
        selectionColor: 'indigo.100',
      }}
      {...props}
    />
  );
};
