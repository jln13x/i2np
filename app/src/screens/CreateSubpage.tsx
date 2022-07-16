import { Flex } from 'native-base';
import { Layout } from '../components/Layout';
import { useSelectedResult } from '../stores/selected-result';
import { useSelectedText } from '../stores/selected-text';

export const CreateSubpageScreen = () => {
  const { selectedResult } = useSelectedResult();
  const { selectedText } = useSelectedText();

  return (
    <Layout>
      <Flex flexDirection="column">
        {/* <Text fontSize="xl">Subpage of {pageTitle}</Text> */}
      </Flex>
      {/* <TitleForm page={selectedResult} text={selectedText} /> */}
    </Layout>
  );
};
