import * as React from 'react';
import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/login';
import Parse from 'parse/dist/parse.min.js';

function App() {
  useEffect(() => {
    Parse.initialize(
      process.env.REACT_APP_APP_ID,
      process.env.REACT_APP_JAVASCRIPT_KEY
    );

    Parse.serverURL = process.env.REACT_APP_SERVER_URL;
  });

  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );
}

export default App;
