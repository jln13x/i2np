import { Box, IBoxProps } from 'native-base';

export const Container: React.FC<IBoxProps> = ({ children, ...props }) => {
  return (
    <Box px={4} w="full"{...props}>
      {children}
    </Box>
  );
};
