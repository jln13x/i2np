import { PrimaryButton } from '@/components/button/PrimaryButton';
import { Input } from '@/components/Input';
import { CustomGetPageResponseDetailed } from '@/lib/notion';
import { Box, Flex, Text } from 'native-base';
import React, { useState } from 'react';
import { DEFAULT_TITLE } from '../constants';
import { useCreateSubpage } from '../mutations';
import { CreationFailed } from './CreationFailed';
import { CreationSuccess } from './CreationSuccess';

interface TitleFormProps {
  text: string;
  page: CustomGetPageResponseDetailed;
}

export const TitleForm: React.FC<TitleFormProps> = ({ page, text }) => {
  const [title, setTitle] = useState('');
  const {
    data: createdSubpage,
    mutate: createSubpage,
    isLoading: isCreatingSubpage,
    isSuccess: subpageCreated,
    isError: subpageCreationFailed,
  } = useCreateSubpage();

  const handleCreateSubpage = () => {
    const { id: pageId } = page;

    createSubpage({
      pageId,
      title: title ? title : DEFAULT_TITLE,
      text,
    });
  };

  if (subpageCreated) {
    // @ts-ignore
    const url = createdSubpage?.url as string;

    return <CreationSuccess url={url} />;
  }

  if (subpageCreationFailed) {
    return <CreationFailed />;
  }

  return (
    <Box width="full">
      <Flex mt={6} w="full">
        <Text>Enter a title for the subpage</Text>
        <Input onChangeText={setTitle} value={title} />
        <Box mt={8} mx="auto">
          <PrimaryButton
            onPress={handleCreateSubpage}
            isLoading={isCreatingSubpage}
          >
            Create subpage
          </PrimaryButton>
        </Box>
      </Flex>
    </Box>
  );
};
