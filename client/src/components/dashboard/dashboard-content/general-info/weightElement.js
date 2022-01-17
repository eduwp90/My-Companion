import React from 'react';
import { Text, HStack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import moment from 'moment';

function WeightElement({ kg, timestamp, remove, index }) {
  return (
    <HStack
      spacing={1}
      w="100%"
      my={1}
      border="1px"
      borderRadius="8px"
      p="3px"
      borderColor="lightgrey"
    >
      <Text minW="20%" textAlign="center">
        {kg} Kg
      </Text>
      <Text w="100%" textAlign="center">
        {moment(timestamp).format('DD-MM-YYYY').toString()}
      </Text>
      <IconButton
        size="sm"
        colorScheme="red"
        variant="outline"
        icon={<CloseIcon />}
        onClick={() => remove(index)}
        aria-label="Remove register"
      />
    </HStack>
  );
}

export default WeightElement;
