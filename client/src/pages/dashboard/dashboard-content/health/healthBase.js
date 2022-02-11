import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import LongTerm from './longTerm';
import ShortTerm from './shortTerm';

function HealthBase() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8px">
      <ShortTerm />
      <LongTerm />
    </SimpleGrid>
  );
}

export default HealthBase;
