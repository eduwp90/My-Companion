import React, { useState, useContext } from 'react';
import {
  Button,
  Center,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  CircularProgress,
  Image,
  VStack,
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import Register from './register';
import ErrorMessage from './errorMessage';
import UserService from '../../services/userService';
import { UserContext } from '../../UserContext';

function Login() {
  const defaultState = {
    email: '',
    password: '',
  };

  const errorState = {
    isError: false,
    errorMessage: '',
  };
  const [event, setEvent] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(errorState);

  const isInvalid = event.email === '' || event.password === '';

  const { setUser } = useContext(UserContext);

  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError({ ...error, isError: false });

    const user = await UserService.loginUser(event.email, event.password);

    if (typeof user === 'string') {
      setError({ isError: true, errorMessage: user });
      setEvent(defaultState);
      setIsLoading(false);
    } else {
      setUser(user);
    }
  };

  return (
    <Center h="100vh" bg="red.100">
      <VStack>
        <Image src="appLogo-narrow.png" maxW="280px"></Image>

        <Stack
          boxShadow="md"
          bg="whiteAlpha.900"
          rounded="md"
          p="10"
          spacing="5"
        >
          <Heading as="h1" size="md">
            Log in
          </Heading>
          <form action="submit" onSubmit={handleSubmit}>
            {error.isError && <ErrorMessage message={error.errorMessage} />}
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
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Log In'
                )}
              </Button>
            </Stack>
          </form>
          <Register />
        </Stack>
      </VStack>
    </Center>
  );
}

export default Login;
