import React from 'react';
import {
  useDisclosure,
  Drawer,
  DrawerContent,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import SidebarContent from './sidebarContent';
import MobileNavBar from './mobileNavBar';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNavBar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <p>MAIN CONTENT</p>
      </Box>
    </Box>
  );
}

export default Dashboard;
