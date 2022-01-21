import React, { useState, useContext } from 'react';
import {
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  VStack,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import moment from 'moment';
import { RiRestaurantLine } from 'react-icons/ri';
import { GiPill, GiMolecule, GiGooeyImpact } from 'react-icons/gi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { PetsContext } from '../../petsContext';
import { UserContext } from '../../../../UserContext';
import ApiService from '../../../../services/apiService';

function ShortTermElement({ treatment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activePet } = useContext(PetsContext);
  const { user } = useContext(UserContext);

  const [reminder, setReminder] = useState(treatment[1].reminder);

  function selectIcon() {
    switch (treatment[1].medication) {
      case 'Antibiotic':
        return <GiPill />;
      case 'Antifungal':
        return <GiMolecule />;
      case 'Anti-inflammatory':
        return <GiGooeyImpact />;
      case 'Gastro-Intestinal':
        return <RiRestaurantLine />;
      case 'Other':
        return <BiDotsHorizontalRounded />;
      default:
        return <BiDotsHorizontalRounded />;
    }
  }

  function handleChange(e) {
    setReminder(!reminder);
    if (!reminder) {
      saveReminder();
    }
  }

  async function saveReminder() {
    const reminderData = {
      email: user.get('email'),
      petName: activePet.get('Name'),
      reminderName: treatment[1].medication,
      date: treatment[0],
    };

    console.log(await ApiService.addReminder(reminderData));
  }

  return (
    <HStack
      w="100%"
      diplay="flex"
      justifyContent="space-between"
      onClick={onOpen}
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader display="flex" w="100%" alignItems="center">
            {selectIcon()}
            <Heading size="md" ml={3} p={0}>
              {treatment[1].medication}
            </Heading>
          </ModalHeader>
          <ModalBody>
            <VStack p={0}>
              <Text textColor="gray" textAlign="start" w="100%" mt={-3}>
                {moment.unix(treatment[0]).format('LLL')}
              </Text>
              <Text textColor="gray" textAlign="start" w="100%">
                Observations:
              </Text>
              <Textarea
                size="md"
                value={treatment[1].observations}
                isDisabled={true}
              />
              <Checkbox
                w="100%"
                size="md"
                colorScheme="red"
                value={reminder}
                onChange={handleChange}
              >
                Remind me 1 hour before (Email)
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {selectIcon()}
      <Text flexGrow="1" pl={3}>
        {treatment[1].medication}
      </Text>
      <Text maxW="30%" textColor="grey">
        {moment.unix(treatment[0]).fromNow()}
      </Text>
    </HStack>
  );
}

export default ShortTermElement;
