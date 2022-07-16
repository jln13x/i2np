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
  const { selectedText: tmp, setSelectedText } = useSelectedText();
  const { isOpen, onOpen, onClose } = useDisclose();
  const previousValue = useRef<string>();

  const onEditSelectedText = (text: string) => {
    setSelectedText(text);
  };

  const selectedText =
    '          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, quos. Quibusdam saepe dolorum possimus sequi eos soluta quod necessitatibus. Distinctio ullam officia ex ipsum, ducimus veritatis explicabo quas fuga. Minus itaque consectetur nihil enim aperiam sit nisi dicta tenetur nesciunt voluptas quibusdam magnam in ipsa fuga vero perspiciatis vel, animi cum nulla, hic tempore. Veniam, tenetur asperiores, quam tempore fuga ipsum excepturi provident debitis quas rem sequi modi architecto ea dolores rerum odit beatae velit sint quae? Magni reprehenderit eos expedita officia eum illo error! Aliquid ipsum dignissimos quia ex atque quas, nostrum est fugiat, quod esse, voluptas veniam perspiciatis. Velit aut consequuntur labore assumenda vero beatae quis at dolores deserunt, nostrum saepe accusantium tenetur asperiores aspernatur pariatur natus voluptatum in fugit fuga odit ullam molestiae numquam id nam. Dicta dolore neque, repellat officia, ratione deserunt explicabo quasi consectetur eligendi ab nisi voluptatum earum a eveniet, totam exercitationem autem? Mollitia quo a fugiat quibusdam alias commodi eligendi expedita nulla id. Sapiente voluptate soluta sit ullam dicta recusandae ducimus nihil praesentium voluptas! Porro id veniam hic ipsum excepturi optio alias, inventore explicabo numquam cupiditate atque veritatis corrupti ratione ullam voluptates soluta nisi unde, exercitationem reiciendis, quod possimus distinctio! At, quisquam reprehenderit!           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti, quos. Quibusdam saepe dolorum possimus sequi eos soluta quod necessitatibus. Distinctio ullam officia ex ipsum, ducimus veritatis explicabo quas fuga. Minus itaque consectetur nihil enim aperiam sit nisi dicta tenetur nesciunt voluptas quibusdam magnam in ipsa fuga vero perspiciatis vel, animi cum nulla, hic tempore. Veniam, tenetur asperiores, quam tempore fuga ipsum excepturi provident debitis quas rem sequi modi architecto ea dolores rerum odit beatae velit sint quae? Magni reprehenderit eos expedita officia eum illo error! Aliquid ipsum dignissimos quia ex atque quas, nostrum est fugiat, quod esse, voluptas veniam perspiciatis. Velit aut consequuntur labore assumenda vero beatae quis at dolores deserunt, nostrum saepe accusantium tenetur asperiores aspernatur pariatur natus voluptatum in fugit fuga odit ullam molestiae numquam id nam. Dicta dolore neque, repellat officia, ratione deserunt explicabo quasi consectetur eligendi ab nisi voluptatum earum a eveniet, totam exercitationem autem? Mollitia quo a fugiat quibusdam alias commodi eligendi expedita nulla id. Sapiente voluptate soluta sit ullam dicta recusandae ducimus nihil praesentium voluptas! Porro id veniam hic ipsum excepturi optio alias, inventore explicabo numquam cupiditate atque veritatis corrupti ratione ullam voluptates soluta nisi unde, exercitationem reiciendis, quod possimus distinctio! At, quisquam reprehenderit!';

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
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <Modal.Content>
          <Modal.Header></Modal.Header>
          <Modal.CloseButton />
          <Modal.Body flexGrow={1} px={2} py={2}>
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
