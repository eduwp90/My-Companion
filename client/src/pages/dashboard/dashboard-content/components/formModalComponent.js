import {
  Modal,
  Flex,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Checkbox,
} from '@chakra-ui/react';

function FormModalComponent ({form, purpose, handleChange, dataArray, dateLabel, isLongTerm, now, onClose, togglePeriodic, isPeriodic, isLoading, handleSubmit, isOpen}) {
  const placeholder = 'Select ' + purpose;
  const id = purpose.toLowerCase();
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
      <form>
        <ModalContent m={1}>
          <ModalHeader>Add new {purpose}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w="100%">
              <FormControl isRequired size="sm">
                <FormLabel htmlFor="breed">{purpose}</FormLabel>
                <Select
                  id={id}
                  placeholder={placeholder}
                  value={form.treatment}
                  onChange={handleChange}
                >
                  {dataArray &&
                    dataArray.map(each => (
                      <option key={each}>
                        {each.charAt(0).toUpperCase() +
                          each.slice(1)}
                      </option>
                    ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="observations">Observations</FormLabel>
                <Input
                  id="observations"
                  type="text"
                  placeholder="Enter observations"
                  value={form.observations}
                  onChange={handleChange}
                />
              </FormControl>

            {!isLongTerm && 
              <FormControl isRequired size="sm">
                  <FormLabel htmlFor="breed">Repeat every</FormLabel>
                  <Flex w="100%" alignItems="center">
                    <Input
                      id="repeatNumber"
                      type="number"
                      placeholder="Number"
                      value={form.repeatNumber}
                      onChange={handleChange}
                      me={2}
                      min="1"
                      max="20"
                    />
                    <Select
                      id="repeatEvery"
                      // placeholder="Repeat every"
                      value={form.repeatEvery}
                      onChange={handleChange}
                    >
                      <option>Hours</option>
                      <option>Days</option>
                    </Select>
                  </Flex>
                </FormControl>
            }

              <FormControl isRequired>
                <FormLabel htmlFor="date">{dateLabel}</FormLabel>
                <Input
                  id="date"
                  type="datetime-local"
                  placeholder="Select date"
                  value={form.date}
                  onChange={handleChange}
                  min={now}
                />
              </FormControl>
            
            {isLongTerm &&
              <Flex w="100%" alignItems="center" mt={3}>
                <Checkbox
                  colorScheme="red"
                  isChecked={isPeriodic}
                  onChange={togglePeriodic}
                >
                  Periodic
                </Checkbox>
              </Flex>
            }
              {isPeriodic && isLongTerm && (
                <FormControl isRequired size="sm">
                  <FormLabel htmlFor="breed">Repeat every</FormLabel>
                  <Flex w="100%" alignItems="center">
                    <Input
                      id="repeatNumber"
                      type="number"
                      placeholder="Number"
                      value={form.repeatNumber}
                      onChange={handleChange}
                      me={2}
                      min="1"
                      max="20"
                    />
                    <Select
                      id="repeatEvery"
                      value={form.repeatEvery}
                      onChange={handleChange}
                    >
                      <option>Days</option>
                      <option>Weeks</option>
                      <option>Months</option>
                    </Select>
                  </Flex>
                </FormControl>
              )}
            
            </VStack>
          </ModalBody>
          
          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="red"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
    </form>
  </Modal>
)}

export default FormModalComponent;