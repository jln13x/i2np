import { ITextAreaProps, TextArea } from 'native-base';

export const Textarea: React.FC<ITextAreaProps> = (props) => {
  return (
    <TextArea
      autoCompleteType="off"
      multiline
      spellCheck={false}
      borderColor="gray.100"
      p={0}
      _focus={{
        bg: 'gray.100',
        borderColor: 'gray.100',
        selectionColor: 'indigo.400',
      }}
      {...props}
    />
  );
};
