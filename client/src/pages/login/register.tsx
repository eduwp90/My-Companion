import React, { useContext } from 'react';
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
} from '@chakra-ui/react';
import UserService from '../../services/userService';
import { UserContext } from '../../UserContext';
import AuthenticateFormComponent from '../dashboard/dashboard-content/components/authenticateFormComponent';

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
              <AuthenticateFormComponent 
                error={error} 
                isRegistered={false} 
                spacing={"5"} 
                register={register} 
                formState={{isDirty, errors}}
                getValues={getValues}
              />
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
