import React from 'react';
import { Text, Center, CircularProgress, VStack } from '@chakra-ui/react';

function LoadingContent() {
  return (
    <Center h="100%">
      <VStack>
        <CircularProgress isIndeterminate="true" color="red.600" />
        <Text>Loading Content ...</Text>
      </VStack>
    </Center>
  );
}

export default LoadingContent;
