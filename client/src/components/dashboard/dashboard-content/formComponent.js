import { FormControl, FormLabel, InputGroup, Input, InputLeftAddon, RadioGroup, HStack, Select, Radio, VStack } from '@chakra-ui/react';

function BasicInfoFormComponent ({parent, handleChange, formLabel, size, Data, editable}) {
  const auto='md';
  return (
    <div>
    <VStack w="100%" spacing={2} p={2} display={editable ? 'auto' : 'none'}>

    
      <FormControl isRequired>
      {formLabel && <FormLabel htmlFor="name">Pet name</FormLabel> }
        <InputGroup size={size? size : auto}>
          {!formLabel && <InputLeftAddon children="Name" /> }
          <Input
            id="name"
            type="text"
            placeholder="Enter pet name"
            value={parent.name}
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
      {formLabel && <FormLabel>Gender</FormLabel> }
        <RadioGroup
          id="gender"
          value={parent.gender}
          onChange={handleChange}
          size={size? size : auto}
        >
          <HStack spacing="24px" p={2}>
            {!formLabel && <InputLeftAddon fontSize="sm" children="Gender:" /> }
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <FormControl isRequired>
      {formLabel && <FormLabel htmlFor="breed">Breed</FormLabel> }
        <Select
          size={size? size : auto}
          id="breed"
          placeholder="Select breed"
          value={parent.breed}
          onChange={handleChange}
        >
          {Data.breeds &&
            Data.breeds.map(breed => (
              <option key={breed}>
                {breed.charAt(0).toUpperCase() + breed.slice(1)}
              </option>
            ))}
        </Select>
      </FormControl>

      <FormControl isRequired>
      {formLabel && <FormLabel htmlFor="color">Hair color</FormLabel> }
        <InputGroup size={size? size : auto}>
          {!formLabel && <InputLeftAddon children="Color" /> }
          <Input
            id="color"
            type="text"
            placeholder="Enter hair color"
            value={parent.color}
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
      {formLabel && <FormLabel htmlFor="dateOfBirth">Birth Date</FormLabel> }
        <InputGroup size={size? size : auto}>
          {!formLabel && <InputLeftAddon children="Birth date" /> }
          <Input
            id="dateOfBirth"
            type="date"
            placeholder="Select birth date"
            value={parent.dateOfBirth}
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <InputGroup size={size? size : auto} mb={1.5}>
        {formLabel && <FormLabel htmlFor="chipId">Chip ID</FormLabel>}
          {!formLabel && <InputLeftAddon children="# Chip ID" /> }
          <Input
            id="chipId"
            type="text"
            placeholder="Enter pet Chip ID number"
            autoComplete="off"
            value={parent.chipId}
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>
</VStack>
    </div>
  )
}

export default BasicInfoFormComponent;