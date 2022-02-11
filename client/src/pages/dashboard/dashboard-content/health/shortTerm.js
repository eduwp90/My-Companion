import React, { useContext, useState } from 'react';
import { PetsContext } from '../../petsContext';
import {
  Box,
  StackDivider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import ShortTermForm from './shortTermForm';
import NoData from '../noData';
import ShortTermElement from './shortTermElement';

function useForceUpdate() {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function ShortTerm() {
  const { activePet } = useContext(PetsContext);

  const forceUpdate = useForceUpdate();

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
        {activePet.get('Medication') && activePet.get('Medication').length ? (
          activePet
            .get('Medication')
            .filter((item, idx) => idx < 6)
            .map((e, i) => {
              return <ShortTermElement key={i} treatment={e} />;
            })
        ) : (
          <NoData />
        )}
        {activePet.get('Medication') && activePet.get('Medication').length > 6 && (
          <Text w="100%" textColor="grey" textAlign="center">
            And {activePet.get('Medication').length - 6} more medications...
          </Text>
        )}
      </VStack>
      <ShortTermForm forceUpdate={forceUpdate} />
    </Box>
  );
}

export default ShortTerm;
