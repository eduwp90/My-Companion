import { SimpleGrid } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { PetsContext } from '../../petsContext';
import Basic from './basic';
import Weight from './weight';

function GeneralInfo() {
  const { activePet, setActivePet, component, setComponent } =
    useContext(PetsContext);

  useEffect(() => {
    console.log('useeffect weight component');
  }, [activePet]);
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing="8px">
      <Basic></Basic>
      <Weight></Weight>
    </SimpleGrid>
  );
}

export default GeneralInfo;
