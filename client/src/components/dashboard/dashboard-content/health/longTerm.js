import React, { useContext, useState } from 'react';
import { PetsContext } from '../../petsContext';
import { Box, Flex, HStack, Button, Text, IconButton } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import LongTermForm from './longTermForm';

function LongTerm() {
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
      <HStack h={10} justifyContent="end" alignItems="center" mb={2}>
        <Text w="100%" textAlign="start" ml={2} fontWeight="bold">
          Long term treatments
        </Text>
        <IconButton
          size="sm"
          variant="outline"
          icon={<EditIcon />}
          aria-label="Edit data"
          //onClick={onOpen}
        />
      </HStack>
      <LongTermForm />
    </Box>
  );
}

export default LongTerm;
