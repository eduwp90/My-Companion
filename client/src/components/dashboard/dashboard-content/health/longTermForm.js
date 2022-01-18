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
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import Data from '../../../../helpers/data.js';
import moment from 'moment';
import { PetsContext } from '../../petsContext';
import PetsService from '../../../../services/petsService';

function LongTermForm() {
  const defaultFormState = {
    treatment: '',
    observations: '',
    date: '',
    repeatNumber: '',
    repeatEvery: '',
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
    setForm({ ...form, repeatEvery: '', repeatNumber: '' });
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <form>
          <ModalContent m={1}>
            <ModalHeader>Add new treatment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack w="100%">
                <FormControl isRequired size="sm">
                  <FormLabel htmlFor="breed">Treatment</FormLabel>
                  <Select
                    id="treatment"
                    placeholder="Select treatment"
                    value={form.treatment}
                    onChange={handleChange}
                  >
                    {Data.treatments &&
                      Data.treatments.map(treatment => (
                        <option key={treatment}>
                          {treatment.charAt(0).toUpperCase() +
                            treatment.slice(1)}
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

                <FormControl isRequired>
                  <FormLabel htmlFor="date">Date</FormLabel>
                  <Input
                    id="date"
                    type="datetime-local"
                    placeholder="Select date"
                    value={form.date}
                    onChange={handleChange}
                    min={now}
                  />
                </FormControl>

                <Flex w="100%" alignItems="center" mt={3}>
                  <Checkbox
                    colorScheme="red"
                    isChecked={isPeriodic}
                    onChange={togglePeriodic}
                  >
                    Periodic
                  </Checkbox>
                </Flex>

                {isPeriodic && (
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
                        placeholder="Repeat every"
                        value={form.repeatEvery}
                        onChange={handleChange}
                      >
                        <option>Days</option>
                        <option>Weeks</option>
                        <option>Months</option>
                      </Select>
                    </Flex>
                  </FormControl>
                )}
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

export default LongTermForm;
