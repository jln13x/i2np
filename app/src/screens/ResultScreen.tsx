import { DatabaseActions } from '@/features/database/DatabaseActions';
import { PageActions } from '@/features/page/components';
import { useNavigation } from '@react-navigation/native';
import { Layout } from '../components/Layout';
import { useSelectedResult } from '../stores/selected-result';

export const ResultScreen = () => {
  const { selectedResult: pageOrDatabase } = useSelectedResult();
  const { navigate } = useNavigation();

  if (!pageOrDatabase) {
    navigate('UploadImage');
    return null;
  }

  if (pageOrDatabase.type === 'page') {
    return (
      <Layout>
        <PageActions page={pageOrDatabase} />
      </Layout>
    );
  }

  if (pageOrDatabase.type === 'database') {
    return (
      <Layout>
        <DatabaseActions database={pageOrDatabase} />
      </Layout>
    );
  }

  return null;
};
