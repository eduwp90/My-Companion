import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Basic from './basic';
import Weight from './weight';

function GeneralInfo() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8px">
      <Basic />
      <Weight />
    </SimpleGrid>
  );
}

export default GeneralInfo;
