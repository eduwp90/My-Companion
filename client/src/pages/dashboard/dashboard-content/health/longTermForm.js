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

function LongTermForm({ forceUpdate }) {
  const defaultFormState = {
    treatment: '',
    observations: '',
    date: '',
    repeatNumber: '',
    repeatEvery: 'Days',
  };

  const now = moment().format('YYYY-MM-DDThh:mm');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPeriodic, setIsPeriodic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState(defaultFormState);
  const { activePet, setActivePet } = useContext(PetsContext);

  const toast = useToast();

  function togglePeriodic() {
    setIsPeriodic(!isPeriodic);
    setForm({ ...form, repeatNumber: '' });
  }

  function handleChange(e) {
    const name = e.target.id;
    let value = e.target.value;

    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const newPet = await PetsService.updateLTArray(
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
    let repeatNumber = 0;
    let iterations = 1;

    let eventsArray = activePet.get('LTTreatments');

    if (form.repeatNumber !== '') {
      repeatNumber = form.repeatNumber;
      iterations = 6;
    }

    for (let i = 0; i < iterations; i++) {
      let newDate = moment(form.date)
        .add(i * repeatNumber, form.repeatEvery.toLowerCase())
        .unix();

      let newEvent = [
        newDate,
        {
          treatment: form.treatment,
          observations: form.observations,
          reminder: false,
        },
      ];

      eventsArray.push(newEvent);
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
        purpose={'Treatment'}
        handleChange={handleChange}
        dataArray={Data.treatments}
        dateLabel={'Date'}
        isLongTerm={true}
        now={now}
        onClose={onClose}
        isPeriodic={isPeriodic}
        togglePeriodic={togglePeriodic}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
      />
    </Flex>
  );
}

export default LongTermForm;
