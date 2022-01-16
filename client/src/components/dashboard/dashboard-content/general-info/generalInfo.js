import { SimpleGrid } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { PetsContext } from '../../petsContext';
import Basic from './basic';

function GeneralInfo() {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10px">
      <Basic></Basic>
      <p>OVERVIEW {activePet.get('Name')}</p>
    </SimpleGrid>
  );
}

export default GeneralInfo;
