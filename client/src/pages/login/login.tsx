import React, { useContext } from 'react';
import { string, object, InferType } from 'yup';
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
  InputLeftElement,
} from '@chakra-ui/react';
import {  AtSignIcon, LockIcon}  from '@chakra-ui/icons';
import Register from './register';
import ErrorMessage from './errorMessage';
import UserService from '../../services/userService';
import { UserContext } from '../../UserContext';

const inputSchema = object({
  email: string().email(),
  password: string()
})

let error:string = '';

type Inputs = InferType<typeof inputSchema>

function Login() {
  const { handleSubmit, register, reset, formState: {errors, isSubmitting, isDirty, isValid}} = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const { setUser } = useContext(UserContext);
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const user = await UserService.loginUser(data.email, data.password);
    if (typeof user === 'string') {
      error = user;
      reset({},{keepValues: true});
    } else {
      setUser(user);
    }
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
            {error && !isDirty && <ErrorMessage message={error} />}
            <Stack spacing="5">

              <FormControl isRequired isInvalid={errors.email? true : false}>
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
                    pattern: {value: regex, message: 'Must be valid email.'},
                  })}
                />
                </InputGroup>
                {errors.email && <ErrorMessage message={errors.email.message} />}
              </FormControl>

              <FormControl isRequired isInvalid={errors.password? true : false}>
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
                    minLength: { value: 3, message: 'Password is too short.'},
                  })}
                />
                </InputGroup>
                {errors.password && <ErrorMessage message={errors.password.message} />}
              </FormControl>

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
