import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
  Icon,
  Modal,
  ScrollView,
  Text,
  useDisclose,
} from 'native-base';
import React, { useEffect, useRef } from 'react';
import { useSelectedText } from '../stores/selected-text';
import { PrimaryButton } from './button/PrimaryButton';
import { Textarea } from './Textarea';

export const EditSelectedTextModal: React.FC = () => {
  const { selectedText, setSelectedText } = useSelectedText();
  const { isOpen, onOpen, onClose } = useDisclose();
  const previousValue = useRef<string>();

  const onEditSelectedText = (text: string) => {
    setSelectedText(text);
  };

  useEffect(() => {
    if (isOpen) {
      previousValue.current = selectedText;
      return;
    }

    previousValue.current = undefined;
  }, [isOpen]);

  const cancel = () => {
    setSelectedText(previousValue.current);
    onClose();
  };

  const save = () => {
    onClose();
  };

  const editSelectedText = () => {
    onOpen();
  };

  return (
    <>
      <Button
        ml="auto"
        mb={1}
        alignSelf="center"
        variant="ghost"
        onPress={editSelectedText}
        size="xs"
        colorScheme="indigo"
        p={1}
        px={1}
        leftIcon={<Icon as={MaterialCommunityIcons} name="pencil" size="xs" />}
      >
        <Text fontSize="xs">Edit the text</Text>
      </Button>
      <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <Modal.Content h="full">
          <Modal.CloseButton />
          <Modal.Header>Edit</Modal.Header>
          <Modal.Body flexGrow={1} px={4} py={2}>
            <ScrollView>
              <Textarea
                h="full"
                value={selectedText}
                onChangeText={onEditSelectedText}
              />
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onPress={cancel}>
              <Text>Cancel</Text>
            </Button>
            <PrimaryButton onPress={save}>Save</PrimaryButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
