import React, { useContext } from 'react';
import {
  Text,
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { UserContext } from '../../UserContext';

const SidebarContent = ({ onClose, ...rest }) => {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box
      transition="1s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
    </Box>
  );
};

export default SidebarContent;
