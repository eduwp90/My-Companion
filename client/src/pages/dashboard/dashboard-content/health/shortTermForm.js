import React, { useState, useContext } from 'react';
import {
  Button,
  Flex,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Data from '../../../../helpers/data.js';
import moment from 'moment';
import { PetsContext } from '../../petsContext';
import PetsService from '../../../../services/petsService';
import FormModalComponent from '../components/formModalComponent.js';

function ShortTermForm({ forceUpdate }) {
  const defaultFormState = {
    medication: '',
    observations: '',
    date: '',
    repeatNumber: '',
    repeatEvery: 'Hours',
  };

  const now = moment().format('YYYY-MM-DDThh:mm');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState(defaultFormState);
  const { activePet, setActivePet } = useContext(PetsContext);

  const toast = useToast();

  function handleChange(e) {
    const name = e.target.id;
    let value = e.target.value;

    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const newPet = await PetsService.updateMedicationArray(
      activePet,
      createEventsArray()
    );

    if (typeof newPet === 'string') {
      toast({
        title: 'Error updating data',
        description: newPet,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      setActivePet(newPet);
      setIsLoading(false);
      forceUpdate();
      onClose();
    }
  };

  function createEventsArray() {
    const repeatNumber = form.repeatNumber;
    let newDate = moment().unix();

    const dateLimit = moment(form.date).unix();

    let eventsArray = activePet.get('Medication');

    while (newDate < dateLimit) {
      newDate = moment
        .unix(newDate)
        .add(repeatNumber, form.repeatEvery.toLowerCase())
        .unix();

      let newEvent = [
        newDate,
        {
          medication: form.medication,
          observations: form.observations,
          reminder: false,
        },
      ];
      if (eventsArray) {
        eventsArray.push(newEvent);
      } else {
        eventsArray = [newEvent];
      }
    }

    return eventsArray.sort();
  }

  return (
    <Flex w="100%" justifyContent="end" alignItems="center" p={1.5}>
      <Button colorScheme="red" size="sm" onClick={onOpen}>
        + Add New
      </Button>
      <FormModalComponent 
        form={form}
        purpose={'Medication'}
        handleChange={handleChange}
        dataArray={Data.medications}
        dateLabel={'Until'}
        isLongTerm={false}
        now={now}
        onClose={onClose}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
      />
    </Flex>
  );
}

export default ShortTermForm;
