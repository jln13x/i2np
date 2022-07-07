import { useNavigation } from '@react-navigation/native';
import { Box, Flex, Text } from 'native-base';
import { useState } from 'react';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import { DEFAULT_TITLE } from '../features/subpage/constants';
import { useCreateSubpage } from '../features/subpage/mutations/use-create-subpage';
import { useSelectedResult } from '../stores/selected-result';
import { useSelectedText } from '../stores/selected-text';

export const CreateSubpageScreen = ({}) => {
  const [title, setTitle] = useState('');
  const { mutate: createSubpage } = useCreateSubpage();
  const { selectedResult } = useSelectedResult();
  const { selectedText } = useSelectedText();

  const { navigate } = useNavigation();

  if (selectedResult?.object !== 'page' || !selectedText) {
    navigate('Home');
    return null;
  }

  const handleCreateSubpage = () => {
    const { id: pageId } = selectedResult;

    createSubpage({
      pageId,
      title: title ? title : DEFAULT_TITLE,
      text: selectedText,
    });
  };

  return (
    <Layout>
      <Flex flexDirection="column">
        A new subpage for Thomas Frank Notes is being created
      </Flex>
      <Flex mt={6} w="full">
        <Text>Enter a title for the subpage</Text>
        <Input onChangeText={setTitle} value={title} />
        <Box mt={8} mx="auto">
          <PrimaryButton onPress={handleCreateSubpage}>
            Create subpage
          </PrimaryButton>
        </Box>
      </Flex>
    </Layout>
  );
};
