import {
  FormControl,
  InputGroup,
  Input, 
  InputLeftElement,
  Stack
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import ErrorMessage from '../../../login/errorMessage';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';

AuthenticateFormComponent.propTypes = {
  error: PropTypes.string,
  isRegistered: PropTypes.bool.isRequired,
  spacing: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  formState: PropTypes.shape({
    errors: PropTypes.objectOf(PropTypes.any).isRequired,
    isDirty: PropTypes.bool.isRequired,
  }).isRequired,
  getValues: PropTypes.func,
}

function AuthenticateFormComponent ({error, isRegistered, spacing, register, formState, getValues}: 
  InferProps<typeof AuthenticateFormComponent.propTypes>) {

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'g');

  return (
    <Stack spacing={spacing}>
      {error && !formState.isDirty && 
      <ErrorMessage message={error} />}

      <FormControl isRequired isInvalid={formState.errors.email? true : false}>
        <InputGroup>
        {isRegistered && <InputLeftElement
          pointerEvents="none"
          children={<AtSignIcon color="gray.500" />}
        /> }
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
        {formState.errors.email && formState.errors.email.message && 
        <ErrorMessage message={formState.errors.email.message} />}
      </FormControl>

      <FormControl isRequired isInvalid={formState.errors.password? true: false}>
        <InputGroup>
        {isRegistered &&  <InputLeftElement
          pointerEvents="none"
          children={<LockIcon color="gray.500" />}
        />}
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
        {formState.errors.password && formState.errors.password.message && 
        <ErrorMessage message={formState.errors.password.message} />}
      </FormControl>

      {!isRegistered && getValues && 
      <FormControl isRequired isInvalid={formState.errors.repeat? true: false}>
        <InputGroup>
        <Input
          id="repeat"
          type="password"
          placeholder="Repeat password"
          autoComplete="off"
          {...register('repeat', {
            required: 'Re-enter password.',
            validate: (value: any) => value === getValues('password') || 'Repeat password exactly'
          }
          )}
        />
        </InputGroup>
        {formState.errors.repeat && formState.errors.repeat.message && 
        <ErrorMessage message={formState.errors.repeat.message} />}
      </FormControl> }

    </Stack>
  )
}

export default AuthenticateFormComponent; 
                