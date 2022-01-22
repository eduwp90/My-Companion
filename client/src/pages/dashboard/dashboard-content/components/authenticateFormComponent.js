import {
  FormControl,
  InputGroup,
  Input, 
  FormErrorMessage,
  InputLeftElement,
  Stack
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import ErrorMessage from '../../../login/errorMessage';

function AuthenticateFormComponent ({error, event, handleChange, isRegistered, invalidPassword, invalidEmail, spacing}) {
  return (
    <Stack spacing={spacing}>
      {!isRegistered && error.isError && <ErrorMessage message={error.errorMessage} />}
      <FormControl isRequired isInvalid={invalidEmail}>
        <InputGroup>
        {isRegistered && <InputLeftElement
          pointerEvents="none"
          children={<AtSignIcon color="gray.500" />}
        /> }
        <Input
          id="email"
          type="email"
          placeholder="Enter email"
          value={event.email}
          onChange={handleChange}
        />
        </InputGroup>
        {!isRegistered && invalidEmail && (
          <FormErrorMessage>
            Should be a valid email.
          </FormErrorMessage>
        )}
      </FormControl>

      <FormControl isRequired>
        <InputGroup>
        {isRegistered &&  <InputLeftElement
          pointerEvents="none"
          children={<LockIcon color="gray.500" />}
        />}
        <Input
          id="password"
          type="password"
          placeholder="Enter password"
          autoComplete={isRegistered? "on" : "off"}
          isInvalid={invalidPassword}
          value={event.password}
          onChange={handleChange}
        />
        </InputGroup>
      </FormControl>
      {!isRegistered && <FormControl isRequired isInvalid={invalidPassword}>
        <InputGroup>
          <Input
            id="repeat"
            type="password"
            placeholder="Repeat password"
            autoComplete="off"
            value={event.repeat}
            onChange={handleChange}
          />
        </InputGroup>
        {invalidPassword && (
          <FormErrorMessage>
            Passwords should be the equal.
          </FormErrorMessage>
        )}
      </FormControl>
      }
    </Stack>
  )
}

export default AuthenticateFormComponent; 