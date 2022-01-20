import React, { useState, useContext } from 'react';
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Input,
  useToast,
} from '@chakra-ui/react';
import Data from '../../../../helpers/data.js';
import moment from 'moment';
import { PetsContext } from '../../petsContext';
import PetsService from '../../../../services/petsService';

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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form>
          <ModalContent m={1}>
            <ModalHeader>Add new medication</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack w="100%">
                <FormControl isRequired size="sm">
                  <FormLabel htmlFor="breed">Medication</FormLabel>
                  <Select
                    id="medication"
                    placeholder="Select medication"
                    value={form.medication}
                    onChange={handleChange}
                  >
                    {Data.medications &&
                      Data.medications.map(medication => (
                        <option key={medication}>
                          {medication.charAt(0).toUpperCase() +
                            medication.slice(1)}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="observations">Observations</FormLabel>
                  <Input
                    id="observations"
                    type="text"
                    placeholder="Enter observations"
                    value={form.observations}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired size="sm">
                  <FormLabel htmlFor="breed">Repeat every</FormLabel>
                  <Flex w="100%" alignItems="center">
                    <Input
                      id="repeatNumber"
                      type="number"
                      placeholder="Number"
                      value={form.repeatNumber}
                      onChange={handleChange}
                      me={2}
                      min="1"
                      max="20"
                    />
                    <Select
                      id="repeatEvery"
                      // placeholder="Repeat every"
                      value={form.repeatEvery}
                      onChange={handleChange}
                    >
                      <option>Hours</option>
                      <option>Days</option>
                    </Select>
                  </Flex>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="date">Until</FormLabel>
                  <Input
                    id="date"
                    type="datetime-local"
                    placeholder="Select date"
                    value={form.date}
                    onChange={handleChange}
                    min={now}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                type="submit"
                colorScheme="red"
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
}

export default ShortTermForm;
