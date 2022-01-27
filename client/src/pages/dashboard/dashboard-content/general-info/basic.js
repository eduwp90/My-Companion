import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Heading,
  Image,
  HStack,
  IconButton,
  VStack,
  Text,
  SimpleGrid,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { PetsContext } from '../../petsContext';
import moment from 'moment';
import Data from '../../../../helpers/data';
import { MdPets, MdHelpOutline } from 'react-icons/md';
import { BiMaleSign, BiFemaleSign, BiCake, BiPalette } from 'react-icons/bi';
import PetsService from '../../../../services/petsService';
import BasicInfoFormComponent from '../components/basicInfoFormComponent';

function Basic() {
  const { activePet, setActivePet } = useContext(PetsContext);
  const toast = useToast();

  let defaultFormState = {
    name: activePet.get('Name'),
    gender: activePet.get('Gender'),
    breed: activePet.get('Breed'),
    dateOfBirth: moment(activePet.get('DOB')).format('YYYY-MM-DD').toString(),
    color: activePet.get('Color'),
    chipId: activePet.get('ChipID'),
  };

  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState(defaultFormState);
  const [isLoading, setIsLoading] = useState(false);

  function toggleEdit() {
    setEditable(!editable);
  }

  function onCancel() {
    setForm(defaultFormState);
    toggleEdit();
  }

  const handleChange = e => {
    if (e === 'Male' || e === 'Female') {
      setForm({ ...form, gender: e });
      return;
    }
    const name = e.target.id;
    const value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    const newPet = await PetsService.updatePet(activePet, form);

    if (typeof newPet === 'string') {
      toast({
        title: 'Error updating data',
        description: newPet,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setForm(defaultFormState);
    } else {
      setActivePet(newPet);
    }
    setIsLoading(false);
    toggleEdit();
  };

  useEffect(() => {

    setForm(defaultFormState);
    return () => {
      
    };
  }, [activePet]);

  return (
    <Box
      boxShadow="sm"
      bg="whiteAlpha.900"
      rounded={'md'}
      roundedBottom={editable ? 'md' : '2xl'}
      display="flex"
      flexDirection="column"
      w="full"
    >
      {!editable && (
        <Image
          h={'300px'}
          w={'full'}
          src={activePet.get('Photo') && activePet.get('Photo').url? activePet.get('Photo').url(): 'https://via.placeholder.com/150'}
          objectFit={'cover'}
          roundedTop={'md'}
        />
      )}
      <form action="submit" onSubmit={handleSubmit}>
        <HStack
          h="auto"
          justifyContent="end"
          alignItems="center"
          flex="1"
          roundedTop={editable ? 'md' : '2xl'}
          bg="white"
          mt={!editable && -6}
          p={2}
        >
          {editable ? (
            <Text w="100%" textAlign="start" ml={2} fontWeight="bold">
              General Info
            </Text>
          ) : (
            <Heading
              fontSize={'2xl'}
              fontWeight={500}
              fontFamily={'body'}
              textAlign="start"
              w={'full'}
              ml={2}
            >
              {activePet.get('Name')}
            </Heading>
          )}
          <IconButton
            size="sm"
            variant="outline"
            display={editable ? null : 'none'}
            onClick={onCancel}
            aria-label="Cancel"
            icon={<CloseIcon />}
          />
          <IconButton
            size="sm"
            colorScheme="red"
            variant="solid"
            display={editable ? null : 'none'}
            icon={<CheckIcon />}
            type="submit"
            isLoading={isLoading ? true : false}
            aria-label="Save changes"
          />

          <IconButton
            size="sm"
            variant="outline"
            display={!editable ? null : 'none'}
            onClick={toggleEdit}
            icon={<EditIcon />}
            aria-label="Edit data"
          />
        </HStack>

        {/* FORM START */}

        <BasicInfoFormComponent 
          parent={form}
          handleChange={handleChange}
          formLabel={false}
          size={'sm'}
          Data={Data}
          editable={editable}
        />
      </form>

      {/* Rest of the info */}

      {!editable && (
        <>
          <HStack px={2} w={'full'} ml={2} mt={-1}>
            <MdPets />
            <Text color={'gray.500'}>{activePet.get('Breed')}</Text>
          </HStack>
          <HStack px={2} w={'full'} ml={2}>
            <MdHelpOutline />
            <Text color={'gray.500'}>Chip#: {activePet.get('ChipID')}</Text>
          </HStack>
          <SimpleGrid px={3} py={4} columns={3} spacing={4}>
            <InfoSquare
              icon={
                activePet.get('Gender') === 'Male' ? (
                  <BiMaleSign />
                ) : (
                  <BiFemaleSign />
                )
              }
              text={activePet.get('Gender')}
            />
            <InfoSquare
              icon={<BiCake />}
              text={Data.giveMeTime(activePet.get('DOB'))}
            />
            <InfoSquare icon={<BiPalette />} text={activePet.get('Color')} />
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}

const InfoSquare = ({ icon, text }) => {
  return (
    <VStack bg="red.100" rounded="md" p={4} justifyContent="center">
      {icon}
      <Flex h={'50%'} justifyContent="center" alignItems="center">
        {text}
      </Flex>
    </VStack>
  );
};

export default Basic;
