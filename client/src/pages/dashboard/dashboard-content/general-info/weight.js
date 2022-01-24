import React, { useState, useContext } from 'react';
import {
  Box,
  FormControl,
  HStack,
  Button,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, EditIcon } from '@chakra-ui/icons';
import WeightChart from './weightChart';
import { PetsContext } from '../../petsContext';
import NoData from '../noData';
import WeightElement from './weightElement';
import PetsService from '../../../../services/petsService';

function Weight() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activePet, setActivePet } = useContext(PetsContext);
  const [form, setForm] = useState({
    timestamp: 0,
    weight: 0,
  });
  const [weightArray, setWeightArray] = useState(activePet.get('Weight'));
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const name = e.target.id;
    let value = e.target.value;

    if (name === 'timestamp') {
      value = Date.parse(value);
    } else {
      value = parseInt(value);
    }

    setForm({ ...form, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newRegister = [form.timestamp, form.weight];
    addToArray(newRegister);
  }

  function addToArray(element) {
    setWeightArray(prevValue => {
      const copy = [...prevValue];
      copy.push(element);
      copy.sort();
      return copy;
    });
  }

  function removeFromArray(index) {
    setWeightArray(weightArray.filter((e, i) => i !== index));
  }

  async function saveArray() {
    setIsLoading(true);
    const newPet = await PetsService.updateWeightArray(activePet, weightArray);

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
      console.log(newPet);
      setActivePet(newPet);
      setIsLoading(false);
      onClose();
    }
  }

  return (
    <Box
      boxShadow="sm"
      bg="whiteAlpha.900"
      rounded="md"
      p="2"
      display="flex"
      flexDirection="column"
      w="100%"
    >
      <HStack h={10} justifyContent="end" alignItems="center" mb={2}>
        <Text w="100%" textAlign="start" ml={2} fontWeight="bold">
          Weight Control
        </Text>
        <IconButton
          size="sm"
          variant="outline"
          icon={<EditIcon />}
          aria-label="Edit data"
          onClick={onOpen}
        />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent m={2}>
            <ModalHeader>Modify Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form action="submit">
                <HStack spacing={1}>
                  <FormControl isRequired minW="20%">
                    <InputGroup size="sm">
                      <InputLeftAddon children="Kg" />
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Kg"
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired maxW="65%">
                    <InputGroup size="sm">
                      <InputLeftAddon children="Date" />
                      <Input
                        id="timestamp"
                        type="date"
                        placeholder="Select birth date"
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    variant="solid"
                    icon={<CheckIcon />}
                    onClick={handleSubmit}
                    aria-label="Save register"
                  />
                </HStack>
              </form>
              {activePet.get('Weight').length ? (
                weightArray.map((e, i) => {
                  return (
                    <WeightElement
                      key={i}
                      index={i}
                      remove={removeFromArray}
                      timestamp={e[0]}
                      kg={e[1]}
                    />
                  );
                })
              ) : (
                <NoData />
              )}
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={isLoading ? true : false}
                onClick={saveArray}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </HStack>

      {activePet.get('Weight').length ? (
        <WeightChart activePetWeight={activePet.get('Weight')} />
      ) : (
        <NoData />
      )}
    </Box>
  );
}

export default Weight;
