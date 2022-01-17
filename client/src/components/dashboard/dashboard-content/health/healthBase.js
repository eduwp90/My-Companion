import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import LongTerm from './longTerm';

function HealthBase() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8px">
      <LongTerm />
      <LongTerm />
    </SimpleGrid>
  );
}

export default HealthBase;
