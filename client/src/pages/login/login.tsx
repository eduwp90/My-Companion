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
} from '@chakra-ui/react';
import Register from './register';
import UserService from '../../services/userService';
import { UserContext } from '../../UserContext';
import AuthenticateFormComponent from '../dashboard/dashboard-content/components/authenticateFormComponent';

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
            <Stack spacing="5">
    
              <AuthenticateFormComponent 
                error={error} 
                isRegistered={true} 
                spacing={"5"} 
                register={register} 
                formState={{isDirty, errors}}
                getValues={undefined}
              />       
              
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
