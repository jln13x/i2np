import { UploadImage } from '@/features/upload-image';
import { Box } from 'native-base';
import { Layout } from '../components/Layout';

export const UploadImageScreen = () => {
  return (
    <Layout>
      <Box h="full">
        <UploadImage />
      </Box>
    </Layout>
  );
};
