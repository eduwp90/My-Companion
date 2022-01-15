import React, { useState, useMemo, useEffect, useContext } from 'react';
import {
  useDisclosure,
  Drawer,
  DrawerContent,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import SidebarContent from './sidebarContent';
import MobileNavBar from './mobileNavBar';
import { PetsContext } from './petsContext';
import { UserContext } from '../../UserContext';
import PetsService from '../../services/petsService';
import RegisterPet from './dashboard-content/registerPet';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pets, setPets] = useState([]);
  const [activePet, setActivePet] = useState(null);

  const { user } = useContext(UserContext);

  const providerValue = useMemo(
    () => ({ pets, setPets, activePet, setActivePet }),
    [pets, setPets, activePet, setActivePet]
  );

  async function fetchPetList(user) {
    const petsList = await PetsService.findPetsByUser(user);
    // setPets([...petsList]);
  }

  useEffect(() => {
    fetchPetList(user);
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <PetsContext.Provider value={providerValue}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'flex' }}
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
        <Box ml={{ base: 0, md: 60 }} p="2">
          {pets && pets.length ? <p>pets length</p> : <RegisterPet />}
        </Box>
      </PetsContext.Provider>
    </Box>
  );
}

export default Dashboard;
