import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/login'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  )
}

export default App;
