import React, { useState } from 'react';
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
  Input,
  InputGroup,
  FormControl,
} from '@chakra-ui/react';
import UserService from '../services/userService';

function Register() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultState = {
    email: '',
    password: '',
    repeat: '',
  };
  const [event, setEvent] = useState(defaultState);

  const invalidPassword = event.password !== event.repeat;

  const isInvalid =
    event.email === '' ||
    event.password === '' ||
    event.repeat === '' ||
    invalidPassword;

  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    UserService.saveUser(event.email, event.password);
    setEvent(defaultState);

    console.log('registering...');
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
          <form action="submit" onSubmit={handleSubmit}>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing="3">
                <FormControl isRequired>
                  <InputGroup>
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
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      autoComplete="off"
                      isInvalid={invalidPassword}
                      value={event.password}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      id="repeat"
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="off"
                      isInvalid={invalidPassword}
                      value={event.repeat}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="red" isDisabled={isInvalid}>
                Create Account
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export default Register;
