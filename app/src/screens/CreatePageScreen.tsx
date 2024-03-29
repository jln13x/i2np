import { PrimaryButton } from '@/components/button/PrimaryButton';
import { Container } from '@/components/Container';
import { Input } from '@/components/Input';
import { Layout } from '@/components/Layout';
import { Error } from '@/components/states/Error';
import { Title } from '@/components/Title';
import { useSelectedResult } from '@/stores/selected-result';
import { useSelectedText } from '@/stores/selected-text';
import { getTitle } from '@/utils/get-title';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Center, Icon, Link, Text } from 'native-base';
import { useState } from 'react';
import { CreatePageSuccess } from '../features/page/components/CreatePageSuccess';
import { useCreatePage } from '../features/page/mutations/use-create-page';

export const CreatePageScreen = () => {
  const {
    data: createdPage,
    mutate: createPage,
    isLoading: isCreatingPage,
    isSuccess: pageCreated,
    isError: pageCreationFailed,
    reset: resetPageCreation,
  } = useCreatePage();

  const { navigate } = useNavigation();

  const [title, setTitle] = useState('');
  const { selectedText } = useSelectedText();
  const { selectedResult } = useSelectedResult();

  if (!selectedText || !selectedResult) {
    navigate('Home');
    return null;
  }

  const { id: parentPageId, url, icon, object: type } = selectedResult;

  const emoji = icon?.type === 'emoji' ? icon.emoji : null;
  const parentTitle = getTitle(selectedResult);

  const handleCreatePage = () => {
    createPage({
      parentId: parentPageId,
      text: selectedText,
      title,
      parentType: type,
    });
  };

  if (createdPage && pageCreated) {
    const { url } = createdPage;

    return (
      <Layout>
        <Center h="full">
          <CreatePageSuccess pageUrl={url} />
        </Center>
      </Layout>
    );
  }

  if (pageCreationFailed) {
    return (
      <Layout>
        <Center h="full">
          <Error retry={resetPageCreation} />
        </Center>
      </Layout>
    );
  }

  const subtitle =
    type === 'page' ? `Creating subpage of page` : 'Creating page for database';

  return (
    <Layout>
      <Center w="full" h="full" alignItems="stretch">
        <Container>
          <Text
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="lg"
            color="text.400"
          >
            {subtitle}
          </Text>
          <Link href={url}>
            <Title title={parentTitle} emoji={emoji} />
            <Icon
              as={MaterialCommunityIcons}
              name="open-in-new"
              size="md"
              color="brand"
              alignSelf="center"
              ml={2}
            />
          </Link>

          <Box mt={8}>
            <Text>Enter a title for the page</Text>
            <Input
              onChangeText={setTitle}
              value={title}
              isRequired={true}
              mt={2}
            />
            <Box mt={8} h="12">
              {title && (
                <PrimaryButton
                  onPress={handleCreatePage}
                  isLoading={isCreatingPage}
                  disabled={!title}
                >
                  Create new page
                </PrimaryButton>
              )}
            </Box>
          </Box>
        </Container>
      </Center>
    </Layout>
  );
};
