import React, { useState, useContext } from 'react';
import {
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { RiRestaurantLine } from 'react-icons/ri';
import { GiPill, GiMolecule, GiGooeyImpact } from 'react-icons/gi';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { PetsContext } from '../../petsContext';
import { UserContext } from '../../../../UserContext';
import ApiService from '../../../../services/apiService';
import BasicModalComponent from '../components/basicModalComponent';

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
      <BasicModalComponent 
        isOpen={isOpen}
        onClose={onClose}
        handleChange={handleChange}
        treatment={treatment}
        reminder={reminder}
        selectIcon={selectIcon}
      />
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
