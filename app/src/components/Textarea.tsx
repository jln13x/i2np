import { ITextAreaProps, TextArea } from "native-base";

export const Textarea: React.FC<ITextAreaProps> = (props) => {
  return (
    <TextArea
      autoCompleteType="off"
      multiline
      spellCheck={false}
      _focus={{
        bg: "gray.100",
        borderColor: "indigo.400",
        selectionColor: "indigo.100",
      }}
      {...props}
    />
  );
};
