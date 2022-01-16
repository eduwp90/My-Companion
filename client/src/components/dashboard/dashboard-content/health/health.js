import React, { useContext, useState } from 'react';
import { PetsContext } from '../../petsContext';
import { Box, Flex, HStack, Button } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

function Health() {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);

  const [editable, setEditable] = useState(false);

  function toggleEdit() {
    setEditable(!editable);
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
      <HStack h={10} justifyContent="end" alignItems="center">
        <Button
          leftIcon={<CloseIcon />}
          size="sm"
          variant="outline"
          display={editable ? 'auto' : 'none'}
          onClick={toggleEdit}
        >
          Cancel
        </Button>
        <Button
          leftIcon={<CheckIcon />}
          size="sm"
          colorScheme="red"
          variant="solid"
          display={editable ? 'auto' : 'none'}
        >
          Save
        </Button>
        <Button
          size="sm"
          variant="outline"
          display={!editable ? 'auto' : 'none'}
          onClick={toggleEdit}
        >
          <EditIcon />
        </Button>
      </HStack>
    </Box>
  );
}

export default Health;
