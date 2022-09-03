import { ISpinnerProps, Spinner as NativeBaseSpinner } from 'native-base';

export const Spinner: React.FC<ISpinnerProps> = (props) => {
  return <NativeBaseSpinner color="brand" {...props} />;
};
