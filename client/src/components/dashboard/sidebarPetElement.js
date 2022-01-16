import { Box, Avatar, Text, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { PetsContext } from './petsContext';

function SidebarPetElement({ pet, close }) {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);

  const isSelected = activePet && pet.id === activePet.id;

  // const menuItems = [
  //   { name: 'Overview', icon: FiHome },
  //   { name: 'General Info', icon: FiTrendingUp },
  //   { name: 'Health', icon: FiCompass },
  //   { name: 'Training', icon: FiStar },
  // ];

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
          <Text p={1} fontWeight="bold">
            {pet.get('Name')}
          </Text>
          <Text p={1} fontSize={{ base: 'md', md: 'sm' }}>
            {pet.get('Color')} {pet.get('Breed')}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default SidebarPetElement;
