import { Box, Avatar, Text, Flex } from '@chakra-ui/react';
import React from 'react';

function SidebarPetElement({ pet }) {
  return (
    <Box
      w="100%"
      height="30p"
      display="flex"
      rounded="lg"
      bg="rgb(238, 242, 247)"
      p={3}
      alignItems="center"
    >
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
    </Box>
  );
}

export default SidebarPetElement;
