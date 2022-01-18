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
import LongTermForm from './longTermForm';
import moment from 'moment';
import NoData from '../noData';
import LongTermElement from './longTermElement';

function LongTerm() {
  const { activePet } =
    useContext(PetsContext);

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
          Long term treatments
        </Heading>
      </HStack>
      <VStack p={2} divider={<StackDivider borderColor="gray.200" />}>
        {activePet.get('LTTreatments').length ? (
          activePet
            .get('LTTreatments')
            .filter((item, idx) => idx < 6)
            .map((e, i) => {
              return <LongTermElement key={i} treatment={e} />;
            })
        ) : (
          <NoData />
        )}
        {activePet.get('LTTreatments').length > 6 && (
          <Text w="100%" textColor="grey" textAlign="center">
            And {activePet.get('LTTreatments').length - 6} more treatments...
          </Text>
        )}
      </VStack>
      <LongTermForm />
    </Box>
  );
}

export default LongTerm;
