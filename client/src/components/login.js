import React, { useState } from 'react';
import {
  Button,
  Center,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import Register from './register';

function Login() {
  const defaultState = {
    email: '',
    password: '',
  };
  const [event, setEvent] = useState(defaultState);

  const isInvalid = event.email === '' || event.password === '';

  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setEvent(defaultState);

    console.log('Signing in...');
  };

  return (
    <Center h="100vh" bg="red.100">
      <Stack boxShadow="md" bg="whiteAlpha.900" rounded="md" p="10" spacing="5">
        <Heading as="h1">Log in</Heading>
        <form action="submit" onSubmit={handleSubmit}>
          <Stack spacing="5">
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.500" />}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={event.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<LockIcon color="gray.500" />}
                />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  autoComplete="on"
                  value={event.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" colorScheme="red" isDisabled={isInvalid}>
              Log in
            </Button>
          </Stack>
        </form>
        <Register />
      </Stack>
    </Center>
  );
}

export default Login;
