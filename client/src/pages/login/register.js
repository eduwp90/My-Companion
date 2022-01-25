import React, { useState, useContext, ChangeEvent, FormEvent} from 'react';
import {
  Button,
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

function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultState = {
    email: '',
    password: '',
    repeat: '',
  };

  const errorState = {
    isError: false,
    errorMessage: '',
  };
  const [formInputs, setFormInputs] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(errorState);

  const invalidPassword = formInputs.password !== formInputs.repeat;

  const invalidEmail = formInputs.email.length
    ? !Auth.validateEmail(formInputs.email)
    : false;

  const isInvalid =
    formInputs.email === '' ||
    formInputs.password === '' ||
    formInputs.repeat === '' ||
    invalidPassword ||
    invalidEmail;

  const { setUser } = useContext(UserContext);

  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError({ ...error, isError: false });
    const user = await UserService.saveUser(formInputs.email, formInputs.password);

    if (typeof user === 'string') {
      setError({ isError: true, errorMessage: user });
      setFormInputs(defaultState);
      setIsLoading(false);
    } else {
      setUser(user);
    }
  };

  return (
    <Stack justify="center" color="gray.600" spacing="5">
      <Text as="div" textAlign="center">
        <span>Don't have an account? </span>
        <Button variant="link" colorScheme="red" onClick={onOpen}>
          Sign up
        </Button>
      </Text>

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
                  event={formInputs}
                  handleChange={handleChange}
                  isRegistered={false}
                  spacing={"3"}
                  invalidPassword={invalidPassword}
                  invalidEmail={invalidEmail}
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
  );
}

export default Register;
