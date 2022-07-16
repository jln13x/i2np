import { getTitle } from '@/utils/notion';
import { Flex, Text } from 'native-base';
import { Layout } from '../components/Layout';
import { TitleForm } from '../features/subpage/components/TitleForm';
import { useSelectedResult } from '../stores/selected-result';
import { useSelectedText } from '../stores/selected-text';

export const CreateSubpageScreen = () => {
  const { selectedResult } = useSelectedResult();
  const { selectedText } = useSelectedText();

  if (selectedResult?.object !== 'page' || !selectedText) {
    // navigate('Image');
    return null;
  }

  const pageTitle = getTitle(selectedResult, true);

  return (
    <Layout>
      <Flex flexDirection="column">
        <Text fontSize="xl">Subpage of {pageTitle}</Text>
      </Flex>
      <TitleForm page={selectedResult} text={selectedText} />
    </Layout>
  );
};
