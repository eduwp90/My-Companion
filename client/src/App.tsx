import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Parse from 'parse/dist/parse.min.js';
import UserService from './services/userService';
import { UserContext } from './UserContext';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  Parse.initialize(
    process.env.REACT_APP_APP_ID,
    process.env.REACT_APP_JAVASCRIPT_KEY
  );

  Parse.serverURL = process.env.REACT_APP_SERVER_URL;

  const [user, setUser] = useState(UserService.getCurrentUser());
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate('dashboard') : navigate('login');
  }, [navigate, user]);

  return (
    <ChakraProvider>
      <UserContext.Provider value={providerValue}>
        <Outlet />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
