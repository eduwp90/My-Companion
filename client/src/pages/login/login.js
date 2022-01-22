import React, { useState, useContext } from 'react';
import {
  Button,
  Center,
  Heading,
  Stack,
  CircularProgress,
  Image,
  VStack,
} from '@chakra-ui/react';
import Register from './register';
import ErrorMessage from './errorMessage';
import UserService from '../../services/userService';
import { UserContext } from '../../UserContext';
import AuthenticateFormComponent from '../dashboard/dashboard-content/components/authenticateFormComponent';

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
              <AuthenticateFormComponent 
                error={error}
                handleChange={handleChange}
                isRegistered={true}
                spacing={"5"}
                event={event}
              />
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
