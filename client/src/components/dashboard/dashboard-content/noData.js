import React from 'react';
import { Center, Text } from '@chakra-ui/react';

function NoData() {
  return (
    <Center w="100%" h="100%" minH="250px">
      <Text fontSize="lg" align="center" fontWeight="bold" color="gray.400">
        No Data to display!
      </Text>
    </Center>
  );
}

export default NoData;
