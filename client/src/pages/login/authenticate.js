import React, { useState, useContext } from 'react';
import {
  Button,
  Center,
  Heading,
  Image,
  VStack,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  CircularProgress,
} from '@chakra-ui/react';
import UserService from '../../services/userService';
import Auth from '../../helpers/auth';
import ErrorMessage from './errorMessage';
import { UserContext } from '../../UserContext';
import AuthenticateFormComponent from '../dashboard/dashboard-content/components/authenticateFormComponent';

function Authenticate() {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const { setUser } = useContext(UserContext);

  let defaultState = {
    email: '',
    password: '',
    repeat: '',
  };

  const errorState = {
    isError: false,
    errorMessage: '',
  };

  const [event, setEvent] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(errorState);
  

  const invalidPassword = event.password !== event.repeat;
  const invalidEmail = event.email.length
  ? !Auth.validateEmail(event.email)
  : false;

  const isInvalid = event.email === '' || event.password === '' ;
  

  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };
  
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError({ ...error, isError: false });

    let user = await UserService.loginUser(event.email, event.password)

    if (typeof user === 'string') {
      setError({ isError: true, errorMessage: user });
      setEvent(defaultState);
      setIsLoading(false);
    } else {
      setUser(user);
    }
  };

  return (
    <div>
    
    <Stack justify="center" color="gray.600" spacing="5">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <form action="submit" onSubmit={handleSubmit}>
            <ModalBody>
              <Stack spacing="3">
                {error.isError && <ErrorMessage message={error.errorMessage} />}
                <AuthenticateFormComponent
                  error={error}
                  event={event}
                  handleChange={handleChange}
                  isRegistered={false}
                  invalidEmail={invalidEmail}
                  invalidPassword={invalidPassword}
                  spacing={"3"}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="red" isDisabled={isInvalid}>
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Create Account'
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
    
    
    
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
              event={event}
              handleChange={handleChange}
              isRegistered={true}
              spacing={"5"}
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
          <Text as="div" textAlign="center">
            <span>Don't have an account? </span>
            <Button variant="link" colorScheme="red" onClick={onOpen}>
              Sign up
            </Button>
          </Text>
        </Stack>
      </VStack>
    </Center>
    
    </div>
  );
}

export default Authenticate;