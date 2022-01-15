import React, { useContext } from 'react';
import {
  HStack,
  Image,
  Flex,
  IconButton,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
} from '@chakra-ui/react';
import { FiMenu, FiUser } from 'react-icons/fi';
import { UserContext } from '../../UserContext';
import UserService from '../../services/userService';

const MobileNavBar = ({ onOpen, ...rest }) => {
  const { user, setUser } = useContext(UserContext);

  async function handleClick() {
    const user = await UserService.logoutUser();
    if (!user) setUser(user);
    else console.log(user);
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
        <Image
          display="flex"
          src="appLogo.png"
          maxW={220}
          alt="My Companion"
        />
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiUser />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>{user && `${user.attributes.email}`}</PopoverHeader>
            <PopoverBody>
              <Button colorScheme="red" w={'100%'} onClick={handleClick}>
                Log out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Flex>
  );
};

export default MobileNavBar;
