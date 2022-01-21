import React, { useState, useContext, useRef, useEffect } from 'react';
import { PetsContext } from '../petsContext';
import {
  Heading,
  Stack,
  FormControl,
  InputGroup,
  Button,
  Input,
  CircularProgress,
  FormLabel,
} from '@chakra-ui/react';
import ErrorMessage from '../../login/errorMessage';
import Data from '../../../helpers/data';
import ImageUpload from './imageUpload';
import PetsService from '../../../services/petsService';
import { UserContext } from '../../../UserContext';
import BasicInfoFormComponent from './components/basicInfoFormComponent';

function RegisterPet() {
  const defaultState = {
    name: '',
    gender: '',
    breed: '',
    dateOfBirth: '',
    color: '',
    chipId: '',
  };

  const errorState = {
    isError: false,
    errorMessage: '',
  };

  const uploadRef = useRef(null);

  const [event, setEvent] = useState(defaultState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(errorState);
  const [photo, setPhoto] = useState(null); //could set to default photo?

  const isInvalid =
    event.name === '' ||
    event.gender === '' ||
    event.breed === '' ||
    event.dateOfBirth === '' ||
    event.color === '';

  const { pets, setPets, setActivePet, setComponent } = useContext(PetsContext);
  const { user } = useContext(UserContext);

  const handleChange = e => {
    if (e === 'Male' || e === 'Female') {
      setEvent({ ...event, gender: e });
      return;
    }
    const name = e.target.id;
    let value = e.target.value;

    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const newPet = await PetsService.savePet(user, event, photo);

    if (typeof newPet === 'string') {
      setError({ isError: true, errorMessage: newPet });
      setEvent(defaultState);
      setIsLoading(false);
    } else {
      setActivePet(newPet);
      setPets([...pets, newPet]);
      setComponent(1);
    }
  };

  const handlePhoto = async e => {
    const photoToUpload = e.target && e.target.files[0];
    setPhoto(photoToUpload);
  };

  useEffect(() => {
    setActivePet(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack bg="white" p="3" spacing="2" rounded="md">
      <Heading size="md" mb="2">
        Register your pet
      </Heading>
      <form action="submit" onSubmit={handleSubmit}>
        <Stack spacing="3">
          <FormControl>
            <FormLabel htmlFor="image">
              <ImageUpload image={photo} />
            </FormLabel>
            <InputGroup>
              <Input
                id="image"
                type="file"
                accept="image/png, image/jpeg"
                ref={uploadRef}
                display="none"
                onChange={handlePhoto}
              />
            </InputGroup>
           </FormControl>
            <BasicInfoFormComponent 
              parent={event}
              handleChange={handleChange}
              formLabel={true}
              Data={Data}
              editable={true}
            />
          {error.isError && <ErrorMessage message={error.errorMessage} />}
          <Button type="submit" colorScheme="red" isDisabled={isInvalid}>
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Register pet'
            )}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default RegisterPet;
