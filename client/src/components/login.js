import React, { useState } from 'react';
import {
  Button,
  Center,
  Heading,
  Stack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';

function Login() {
  const [event, setEvent] = useState({
    email: '',
    password: '',
  });

  const isInvalid = event.email === '' || event.password === '';

  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('Signing in...');
  };

  return (
    <Center h="100vh" bg="red.100">
      <Stack boxShadow="md" bg="whiteAlpha.900" rounded="md" p="10" spacing="4">
        <Heading as="h1">Log in</Heading>
        <form action="submit" onSubmit={handleSubmit}>
          <Stack spacing="3">
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

        <Stack justify="center" color="gray.600" spacing="3">
          <Text as="div" textAlign="center">
            <span>Don't have an account? </span>
            <Button variant="link" colorScheme="red">
              Sign up
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
}

export default Login;
