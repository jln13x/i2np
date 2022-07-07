import { ISpinnerProps, Spinner as NativeBaseSpinner } from "native-base";

export const Spinner: React.FC<ISpinnerProps> = (props) => {
  return <NativeBaseSpinner color="indigo.500" {...props} />;
};
