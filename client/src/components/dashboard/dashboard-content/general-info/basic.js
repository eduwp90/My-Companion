import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Image,
  HStack,
  IconButton,
  FormControl,
  Input,
  Avatar,
  VStack,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { PetsContext } from '../../petsContext';
import moment from 'moment';
import { MdPets } from 'react-icons/md';
import { BiMaleSign, BiFemaleSign } from 'react-icons/bi';

function Basic() {
  const { activePet } = useContext(PetsContext);

  const defaultFormState = {
    name: activePet.get('Name'),
    gender: activePet.get('Gender'),
    breed: activePet.get('Breed'),
    dateOfBirth: moment(activePet.get('DOB')).format('YYYY-MM-DD').toString(),
    color: activePet.get('Color'),
    chipId: activePet.get('Chip'),
  };

  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState(defaultFormState);

  function toggleEdit() {
    setEditable(!editable);
  }

  const handleChange = e => {
    if (e === 'Male' || e === 'Female') {
      setForm({ ...form, gender: e });
      return;
    }
    const name = e.target.id;
    let value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <Box
      boxShadow="sm"
      bg="whiteAlpha.900"
      rounded={'md'}
      display="flex"
      flexDirection="column"
      w="full"
    >
      <Image
        h={'300px'}
        w={'full'}
        src={activePet.get('Photo').url()}
        objectFit={'cover'}
        roundedTop={'md'}
      />
      <HStack
        h="auto"
        justifyContent="end"
        alignItems="center"
        flex="1"
        roundedTopEnd={'2xl'}
        bg="white"
        mt={-6}
        p={2}
      >
        <Text w="100%" textAlign="start" ml={2} fontWeight="bold">
          General Info
        </Text>
        <IconButton
          size="sm"
          variant="outline"
          display={editable ? 'auto' : 'none'}
          onClick={toggleEdit}
          icon={<CloseIcon />}
        />
        <IconButton
          size="sm"
          colorScheme="red"
          variant="solid"
          display={editable ? 'auto' : 'none'}
          icon={<CheckIcon />}
        />

        <IconButton
          size="sm"
          variant="outline"
          display={!editable ? 'auto' : 'none'}
          onClick={toggleEdit}
          icon={<EditIcon />}
        />
      </HStack>
      <HStack
        h="auto"
        justifyContent="start"
        alignItems="center"
        flex="1"
        mx={1}
        my={1}
      >
        
        <VStack w="100%" spacing={0.2} justifyContent="start">
          <FormControl>
            <InputGroup>
              <InputLeftElement children={<MdPets />} />
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                variant="flushed"
                border={editable ? 'auto' : 'hidden'}
                isReadOnly={editable ? false : true}
                fontWeight="bold"
              />
            </InputGroup>
          </FormControl>
          <HStack w="100%" ml="2rem">
            <FormControl h="100%" ml={1}>
              <InputGroup size="sm">
                <InputLeftElement
                  children={
                    activePet.get('Gender') === 'Male' ? (
                      <BiMaleSign />
                    ) : (
                      <BiFemaleSign />
                    )
                  }
                />
                <Input
                  id="gender"
                  type="text"
                  value={form.gender}
                  onChange={handleChange}
                  variant="flushed"
                  border={editable ? 'auto' : 'hidden'}
                  isReadOnly={editable ? false : true}
                />
              </InputGroup>
            </FormControl>
          </HStack>
          <FormControl h="100%">
            <Input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              variant={editable ? 'flushed' : 'unstyled'}
              isReadOnly={editable ? false : true}
              size="sm"
            />
          </FormControl>
        </VStack>
      </HStack>
    </Box>
  );
}

export default Basic;
