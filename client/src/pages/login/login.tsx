import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  Button,
  Center,
  Heading,
  Stack,
  CircularProgress,
  Image,
  VStack, 
  FormControl,
  InputGroup,
  Input, 
  FormErrorMessage,
  InputLeftElement,
} from '@chakra-ui/react';
import {  AtSignIcon, LockIcon}  from '@chakra-ui/icons';
import Register from './register';
import ErrorMessage from './errorMessage';
import UserService from '../../services/userService';
import { UserContext } from '../../UserContext';

type Inputs = {
  email: string,
  password: string,
};

function Login() {
  const { handleSubmit, register, formState: {errors, isSubmitting, isDirty, isValid}} = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
});
  const { setUser } = useContext(UserContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {

    console.log('data',data);
    const user = await UserService.loginUser(data.email, data.password);
    setUser(user);
  }


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
          <form action="submit" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register('email', {
                      required: {value: true, message: 'Email is required'},
                    })}
                  />
                  </InputGroup>
                </FormControl>
                {errors.email && <ErrorMessage message={'Email is required.'} />}

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
                    {...register('password', {
                      required: 'Password is required.',
                      minLength: { value: 3, message: 'Password is too short.'}
                    })}
                  />
                  </InputGroup>
                </FormControl>
                {errors.password && <ErrorMessage message={errors.password.message} />}

              <Button type="submit" colorScheme="red" isLoading={isSubmitting} disabled={!isDirty || !isValid}>
                {isSubmitting? (
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
