import moment from 'moment';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Text,
  Textarea,
  Checkbox,
  Button,
  Heading,
  ModalFooter
} from '@chakra-ui/react';

function BasicModalComponent ({isOpen, onClose, handleChange, treatment, reminder, selectIcon}) {
  return (
    <div>
       <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent m={2}>
          <ModalHeader display="flex" w="100%" alignItems="center">
            {selectIcon()}
            <Heading size="md" ml={3} p={0}>
              {treatment[1].treatment}
            </Heading>
          </ModalHeader>
          <ModalBody>
            <VStack p={0}>
              <Text textColor="gray" textAlign="start" w="100%" mt={-3}>
                {moment.unix(treatment[0]).format('LLL')}
              </Text>
              <Text textColor="gray" textAlign="start" w="100%">
                Observations:
              </Text>
              <Textarea
                size="md"
                value={treatment[1].observations}
                isDisabled={true}
              />
              <Checkbox
                w="100%"
                size="md"
                colorScheme="red"
                value={reminder}
                onChange={handleChange}
              >
                Remind me 1 hour before (Email)
              </Checkbox>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default BasicModalComponent;