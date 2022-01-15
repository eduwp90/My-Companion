import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from 'react';
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
import LoadingContent from './dashboard-content/loadingContent';
import useAsyncEffect from 'use-async-effect';
import { Redirect } from 'react-router-dom';
import Overview from './dashboard-content/overview';

function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [component, setComponent] = useState(0);

  const [pets, setPets] = useState([]);
  const [activePet, setActivePet] = useState(null);

  const { user } = useContext(UserContext);

  const providerValue = useMemo(
    () => ({ pets, setPets, activePet, setActivePet, component, setComponent }),
    [pets, setPets, activePet, setActivePet, component, setComponent]
  );

  function renderContent(component) {
    switch (component) {
      case 0:
        return <RegisterPet />;
      case 1:
        return <Overview />;
      default:
        return <RegisterPet />;
    }
  }

  useEffect(() => {
    async function fetchPetList() {
      setIsLoadingContent(true);
      const petsList = await PetsService.findPetsByUser(user);
      setIsLoadingContent(false);

      setPets([...petsList]);
      if (petsList.length) setComponent(1);
    }
    console.log('useeffect dashboard');

    fetchPetList();
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
        <Box ml={{ base: 0, md: 60 }} p="2" h="85vh">
          {isLoadingContent && <LoadingContent />}
          {!isLoadingContent && renderContent(component)}
        </Box>
      </PetsContext.Provider>
    </Box>
  );
}

export default Dashboard;
