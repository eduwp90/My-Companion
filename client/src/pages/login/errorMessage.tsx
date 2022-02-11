import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default function ErrorMessage({ message }: InferProps<typeof ErrorMessage.propTypes>) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}
