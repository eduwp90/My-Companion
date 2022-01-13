import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Parse from 'parse/dist/parse.min';
import UserService from './services/userService';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    Parse.initialize(
      process.env.REACT_APP_APP_ID,
      process.env.REACT_APP_JAVASCRIPT_KEY
    );

    Parse.serverURL = process.env.REACT_APP_SERVER_URL;
    setUser(UserService.getCurrentUser());
  }, []);

  return (
    <ChakraProvider>
      <UserContext.Provider value={providerValue}>
        {user ? <Dashboard /> : <Login />}
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
