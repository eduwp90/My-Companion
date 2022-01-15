import { Box, Avatar, Text, Flex } from '@chakra-ui/react';
import React from 'react';

function SidebarPetElement({ pet }) {
  return (
    <Box w="100%" height="30p" display="flex" rounded="lg" bg="lightgrey" p={3}>
      <Avatar name={pet.get('Name')} src={pet.get('Photo').url()} size="xl" />
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="start"
        justifyContent="center"
        ml={3}
      >
        <Text p={1}>{pet.get('Name')}</Text>
        <Text p={1}>
          {pet.get('Color')} {pet.get('Breed')}
        </Text>
      </Flex>
    </Box>
  );
}

export default SidebarPetElement;
