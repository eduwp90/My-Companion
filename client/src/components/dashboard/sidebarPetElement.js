import { Box, Avatar, Text, Flex, Icon } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { PetsContext } from './petsContext';
import { MdInfoOutline, MdLocalHospital, MdSchool } from 'react-icons/md';

function SidebarPetElement({ pet, close }) {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);

  const isSelected = activePet && pet.id === activePet.id;

  const menuItems = [
    { name: 'General Info', icon: MdInfoOutline, id: 1 },
    { name: 'Health', icon: MdLocalHospital, id: 2 },
    { name: 'Training', icon: MdSchool, id: 3 },
  ];

  function onClick() {
    setActivePet(pet);
    setComponent(1);
    close();
  }
  return (
    <Box
      w="100%"
      display="flex"
      rounded="lg"
      bg={isSelected ? 'gray.300' : 'gray.100'}
      p={3}
      alignItems="center"
      onClick={onClick}
      cursor="pointer"
      _hover={
        !isSelected && {
          background: 'gray.200',
        }
      }
    >
      <Flex w="100%" height="30p">
        <Avatar
          name={pet.get('Name')}
          src={pet.get('Photo').url()}
          h={{ base: '96px', md: '64px' }}
          w={{ base: '96px', md: '64px' }}
        />
        <Flex
          w="100%"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          ml={3}
        >
          <Text p={1} fontWeight="bold" cursor="pointer">
            {pet.get('Name')}
          </Text>
          <Text p={1} fontSize={{ base: 'md', md: 'sm' }} cursor="pointer">
            {pet.get('Color')} {pet.get('Breed')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

const sideBarMenu = ({ icon, name, id, setComponent }) => {
  return (
    <Flex align="center" p="4" mx="4" borderRadius="lg" cursor="pointer">
      {icon && <Icon mr="4" fontSize="16" as={icon} />}
      {name && <Text>{name}</Text>}
    </Flex>
  );
};

export default SidebarPetElement;
