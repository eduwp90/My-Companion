import React, { useState, useContext, ChangeEvent, FormEvent} from 'react';
import { string, object, InferType } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form'
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
  FormControl,
  InputGroup,
  Input,
} from '@chakra-ui/react';
import UserService from '../../services/userService';
import ErrorMessage from './errorMessage';
import { UserContext } from '../../UserContext';

const inputSchema = object({
  email: string().email(),
  password: string(),
  repeat: string()
})

let error:string = '';

type Inputs = InferType<typeof inputSchema>

function Register() {
  const { handleSubmit, register, reset, getValues, formState: {errors, isSubmitting, isDirty, isValid}} = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
      repeat: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUser } = useContext(UserContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = await UserService.saveUser(data.email, data.password);
    if (typeof user === 'string') {
      error = user;
      reset({},{keepValues: true});
    } else {
      setUser(user);
    }
  }

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
          <form action="submit" onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Stack spacing="3">
              {error && !isDirty && <ErrorMessage message={error} />}
              
                <FormControl isRequired isInvalid={errors.email? true : false}>
                  <InputGroup>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    {...register('email', {
                      required: {value: true, message: 'Email is required.'},
                      pattern: {value: regex, message: 'Must be valid email.'},
                    })}
                  />
                  </InputGroup>
                  {errors.email && <ErrorMessage message={errors.email.message} />}
                </FormControl>
                
                <FormControl isRequired isInvalid={errors.password? true: false}>
                  <InputGroup>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="off"
                    {...register('password', {
                      required: 'Password is required.',
                      minLength: { value: 3, message: 'Password is too short.'}
                    })}
                  />
                  </InputGroup>
                  {errors.password && <ErrorMessage message={errors.password.message} />}
                </FormControl>
                
                <FormControl isRequired isInvalid={errors.repeat? true: false}>
                  <InputGroup>
                    <Input
                      id="repeat"
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="off"
                      {...register('repeat', {
                        required: 'Re-enter password.',
                        validate: value => value === getValues('password') || 'Repeat password exactly'
                      }
                      )}
                    />
                  </InputGroup>
                  {errors.repeat && <ErrorMessage message={errors.repeat.message} />}                  
                </FormControl>

              </Stack>
            </ModalBody>
            <ModalFooter>
            <Button type="submit" colorScheme="red" isLoading={isSubmitting} disabled={!isDirty || !isValid}>
                {isSubmitting? (
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
