import React, { useContext, useState, useEffect } from 'react';
import { PetsContext } from '../../petsContext';
import {
  Box,
  StackDivider,
  HStack,
  Heading,
  Text,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import ShortTermForm from './shortTermForm';
import moment from 'moment';
import NoData from '../noData';
import ShortTermElement from './shortTermElement';
function ShortTerm() {
  const { activePet } = useContext(PetsContext);

  // useEffect(() => {
  //   console.log('useEffect updated treatment', activePet);

  //   return () => {
  //     console.log('useEffect UNMOUNT treatment', activePet);
  //   };
  // }, [activePet]);

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
      <HStack justifyContent="end" alignItems="center" my={2}>
        <Heading
          w="100%"
          textAlign="start"
          ml={2}
          size="md"
          fontWeight="semibold"
        >
          Medication
        </Heading>
      </HStack>
      <VStack p={2} divider={<StackDivider borderColor="gray.200" />}>
        {activePet.get('Medication').length ? (
          activePet
            .get('Medication')
            .filter((item, idx) => idx < 6)
            .map((e, i) => {
              return <ShortTermElement key={i} treatment={e} />;
            })
        ) : (
          <NoData />
        )}
        {activePet.get('Medication').length > 6 && (
          <Text w="100%" textColor="grey" textAlign="center">
            And {activePet.get('Medication').length - 6} more medications...
          </Text>
        )}
      </VStack>
      <ShortTermForm />
    </Box>
  );
}

export default ShortTerm;
