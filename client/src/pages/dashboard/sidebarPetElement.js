import { Avatar, Text, Flex, Icon, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { PetsContext } from './petsContext';
import { MdInfoOutline, MdLocalHospital, /* MdSchool */} from 'react-icons/md';

function SidebarPetElement({ pet, close }) {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);

  const isSelected = activePet && pet.id === activePet.id;

  const menuItems = [
    { name: 'General Info', icon: MdInfoOutline, id: 1 },
    { name: 'Health', icon: MdLocalHospital, id: 2 },
    // { name: 'Training', icon: MdSchool, id: 3 },
  ];

  function onClick() {
    setActivePet(pet);
  }

  return (
    <VStack
      transition="1s"
      w="100%"
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
      <Flex w="100%" height="30p" mb={1}>
        <Avatar
          name={pet.get('Name')}
          src={pet.get('Photo') && pet.get('Photo').url && pet.get('Photo').url() }
          h={{ base: '80px', md: '64px' }}
          w={{ base: '80px', md: '64px' }}
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
      {menuItems.map(item => {
        return (
          <SideBarMenuItem
            icon={item.icon}
            name={item.name}
            key={item.id}
            id={item.id}
            component={component}
            setComponent={setComponent}
            isSelected={isSelected}
            close={close}
          />
        );
      })}
    </VStack>
  );
}

const SideBarMenuItem = ({
  icon,
  name,
  id,
  component,
  setComponent,
  isSelected,
  close,
}) => {
  const isChildSelected = id === component;

  function onChildClick() {
    setComponent(id);
    close();
  }

  return (
    <Flex
      align="center"
      h={isSelected ? 'auto' : '0px'}
      p="4"
      mx="4"
      mb="2"
      borderRadius="lg"
      cursor="pointer"
      w="100%"
      display={isSelected ? 'flex' : 'none'}
      bg={isChildSelected ? 'gray.200' : 'gray.100'}
      border={isChildSelected ? '1px' : 'none'}
      _hover={
        !isChildSelected && {
          background: 'gray.200',
        }
      }
      onClick={onChildClick}
    >
      {icon && <Icon mr="4" fontSize="16" as={icon} />}
      {name && (
        <Text fontSize={{ base: 'md', md: 'sm' }} cursor="pointer">
          {name}
        </Text>
      )}
    </Flex>
  );
};

export default SidebarPetElement;
