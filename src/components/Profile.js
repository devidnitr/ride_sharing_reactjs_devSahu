import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  VStack,
  Avatar,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { MdNotifications } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'; 

export default function Profile() {
  const navigate = useNavigate();
  const layout = useBreakpointValue({ base: "column", md: "row" });
  const { colorMode, toggleColorMode } = useColorMode();

 
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box p="5" maxW="100%" borderWidth="1px" borderRadius="lg" boxShadow="md" bg={bgColor} borderColor={borderColor}>
      
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize={{ base: "2xl", md: "3xl" }} color="#763AD7" fontWeight="bold">
          Profile
        </Text>

        
        <Flex align="center">
          <Menu>
            <MenuButton as={IconButton} icon={<MdNotifications />} variant="ghost" aria-label="Notifications" fontSize="2xl" />
            <MenuList>
              <MenuItem>Your ride is arriving in 5 minutes</MenuItem>
              <MenuItem>Your OTP is 2118</MenuItem>
              <MenuItem>Promo: 20% off your next ride!</MenuItem>
              <MenuItem>Now you can pay with wallet!</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
              <Avatar size="sm" name="Dev Sahu" src="mypic.jpeg" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem> 
              <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem> 
              <MenuItem onClick={() => navigate('/login')}>Logout</MenuItem>
            </MenuList>
          </Menu>
         
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            ml={4}
            onClick={toggleColorMode}
            fontSize="2xl"
          />
        </Flex>
      </Flex>

      
      <Box p="4" borderWidth="1px" borderRadius="lg" bg="gray.100" mb={6} display={layout} alignItems="center">
        <VStack spacing={4} align="start">
          <Avatar size="2xl" name="Dev Sahu" src="mypic.jpeg" />
          <Text fontSize="xl" color="#9253D2" fontWeight="bold">
            Dev Sahu
          </Text>
          <Text fontSize="sm" color="#2E4ADC">
            devsahu81201@gmail.com
          </Text>
          <Button colorScheme="purple" width="full">
            Edit Profile
          </Button>
        </VStack>
      </Box>

      
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Personal Information
      </Text>
      <Box mb={6}>
        <VStack spacing={4} align="start">
          <Flex direction="column" width="100%">
            <Text fontSize="md" fontWeight="semibold" color="#3F4BBB" mb={1}>
              Full Name
            </Text>
            <Input placeholder="Dev Sahu" />
          </Flex>
          <Flex direction="column" width="100%">
            <Text fontSize="md" fontWeight="semibold" color="#3F4BBB" mb={1}>
              Email Address
            </Text>
            <Input placeholder="devsahu81201@gmail.com" />
          </Flex>
          <Flex direction="column" width="100%">
            <Text fontSize="md" fontWeight="semibold" color="#3F4BBB" mb={1}>
              Phone Number
            </Text>
            <Input placeholder="+91 8120182111" />
          </Flex>
          <Flex direction="column" width="100%">
            <Text fontSize="md" fontWeight="semibold" color="#3F4BBB" mb={1}>
              Address
            </Text>
            <Input placeholder="GD Birla Hall, NIT Rourkela" />
          </Flex>
        </VStack>
      </Box>

     
      <Button colorScheme="purple" width="full">
        Save Changes
      </Button>
    </Box>
  );
}
