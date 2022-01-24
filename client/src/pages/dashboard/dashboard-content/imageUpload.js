import { Flex, Image } from '@chakra-ui/react';
import React from 'react';

function ImageUpload(props) {
  return (
    <Flex alignItems="center" justifyContent="center" flexGrow="1">
      <Image
        borderRadius="25"
        src={props.image ? URL.createObjectURL(props.image) : 'photoupload.svg'}
        fallbackSrc='https://via.placeholder.com/150'
        alt="Upload picture"
        boxSize={{ base: '140px', md: '180px' }}
        cursor="pointer"
        _hover={{ backgroundColor: 'red.100' }}
        border="2px"
        borderColor="red.100"
        fit="cover"
        boxShadow="md"
      />
    </Flex>
  );
}

export default ImageUpload;
