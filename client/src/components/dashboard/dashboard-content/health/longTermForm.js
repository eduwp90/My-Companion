import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import Data from '../../../../helpers/data.js';

function LongTermForm() {
  const defaultFormState = {
    treatment: '',
    observations: '',
    date: '',
    repeatNumber: '',
    repeatEvery: '',
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState(defaultFormState);
  const [isPeriodic, setIsPeriodic] = useState(false);

  function togglePeriodic() {
    setIsPeriodic(!isPeriodic);
    setForm({ ...form, repeatNumber: '' });
    setForm({ ...form, repeatEvery: '', repeatNumber: '' });
  }

  function handleChange(e) {
    const name = e.target.id;
    console.log(name);
    let value = e.target.value;
    console.log(value);

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Flex w="100%" justifyContent="end" alignItems="center">
      <Button colorScheme="red" size="sm" onClick={onOpen}>
        + Add New
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent m={1}>
          <ModalHeader>Add new treatment</ModalHeader>
          <ModalCloseButton />
          <form action="submit" onSubmit={handleSubmit}>
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
                  />
                </FormControl>

                <Flex w="100%" alignItems="center">
                  <Checkbox
                    colorScheme="red"
                    value={isPeriodic}
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
              <Button colorScheme="red">Save</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default LongTermForm;
