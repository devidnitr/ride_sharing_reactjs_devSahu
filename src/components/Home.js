import React, { useState, useCallback } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  IconButton,
  Grid,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useBreakpointValue,
  Image,
  HStack,
  useColorMode,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 
import { MdNotifications } from "react-icons/md";
import { ChevronDownIcon, ChevronRightIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { isOpen: isHistoryOpen, onOpen: onHistoryOpen, onClose: onHistoryClose } = useDisclosure();
  const { isOpen: isShareOpen, onOpen: onShareOpen, onClose: onShareClose } = useDisclosure();

  const [timeOption, setTimeOption] = useState("Now");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [selectingFrom, setSelectingFrom] = useState(true);

  const { colorMode, toggleColorMode } = useColorMode();
  const center = { lat: 37.7749, lng: -122.4194 };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = useCallback(
    (event) => {
      const newLocation = { lat: event.latLng.lat(), lng: event.latLng.lng() };

      if (selectingFrom) {
        setFromLocation(newLocation);
        setSelectingFrom(false);
      } else {
        setToLocation(newLocation);
        setSelectingFrom(true);
      }
    },
    [selectingFrom]
  );

  const handleClick = (option) => {
    alert(`You clicked on ${option}`);
  };

  const handleTimeChange = (option) => {
    setTimeOption(option);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  if (!isLoaded) {
    return <Text>Loading Map...</Text>;
  }

  return (
    <Box
      p={{ base: 4, md: 6 }}
      borderRadius="lg"
      boxShadow="xl"
      bg={useColorModeValue("white", "gray.900")}
    >
     
      <Flex justify="space-between" align="center" mb={{ base: 4, md: 6 }}>
      <Text
  fontSize={{ base: "xl", md: "2xl", lg: "4xl", xl: "5xl" }}  
  ml={{ base: 4, sm: 8, md: 20, lg: 32 }} 
  textAlign={{ base: "center", md: "left" }}  
  mt={{ base: 4, md: 6 }} 
>
  Request a ride for now or later
</Text>


        <Flex align="center">
          <Button variant="ghost" onClick={onShareOpen}>
            Ride Share
          </Button>
          <Button variant="ghost" onClick={onHistoryOpen} ml={4}>
            Ride History
          </Button>
          <Button
    colorScheme="purple" 
    variant="solid"     
    onClick={() => navigate("/login")} 
    ml={4}             
  >
    Login
  </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdNotifications />}
              variant="ghost"
              aria-label="Notifications"
              fontSize="3xl"
            />
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
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
              <MenuItem onClick={() => navigate("/login")}>Logout</MenuItem>
            </MenuList>
          </Menu>

          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle dark mode"
            onClick={toggleColorMode}
            variant="ghost"
            ml={4}
          />
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" direction={{ base: "column", lg: "row" }}>
       
        <Box flex="1" mr={{ base: 0, lg: 8 }} mb={{ base: 4, lg: 0 }}>
          <Text
            mb={4}
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} 
            fontWeight="semi-bold"
            color="#3F4BBB"
            textAlign="center"
            lineHeight="tall"
          >
            Add your trip details, hop in, and go.
          </Text>
          <Stack spacing={4}>
           
            <Input
              placeholder="Enter location"
              size="lg"
              value={fromLocation ? `Lat: ${fromLocation.lat}, Lng: ${fromLocation.lng}` : ""}
              readOnly
            />

           
            <Input
              placeholder="Enter destination"
              size="lg"
              value={toLocation ? `Lat: ${toLocation.lat}, Lng: ${toLocation.lng}` : ""}
              readOnly
            />
          </Stack>

         
          <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={6}>
            <Button
              colorScheme="purple"
              size="lg"
              boxShadow="md"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => navigate("/ridepage")}
              width={{ base: "100%", md: "auto" }} 
            >
              See prices
            </Button>
            <Button variant="outline" size="lg" width={{ base: "100%", md: "auto" }}>
              Schedule for later
            </Button>
          </Stack>
        </Box>

       
        <Box flex="1" h={{ base: "300px", md: "400px" }} w="full" borderRadius="lg" overflow="hidden">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12} onClick={handleMapClick}>
            {fromLocation && <Marker position={fromLocation} />}
            {toLocation && <Marker position={toLocation} />}
          </GoogleMap>
        </Box>
      </Flex>

     
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        p={{ base: 4, md: 6 }}
        mb={8}
      >
       
        <Box
          flex="1"
          height={{ base: "200px", md: "400px" }}
          borderRadius="lg"
          backgroundImage="url('/RideMain.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          mb={{ base: 4, md: 0 }} 
        />

       
        <VStack
    spacing={4}
    align="start"
    flex="1" 
    p={6}
    color={useColorModeValue("gray.800", "gray.300")}
    width="100%" 
    maxWidth="1200px"  
    justify="center"
  >
    
    <Text fontSize={{ base: "xl", md: "3xl" }} color="#9253D2" fontWeight="bold">
      Ready for a smooth ride?
    </Text>
    <Text fontSize={{ base: "md", md: "lg" }}>
      Book a ride for now, schedule it for later, or explore other options.
    </Text>

   
    <Grid 
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} 
      color='#9253D2' 
      gap={4} 
      mb={8} 
      width="100%" 
    >
      {["Ride", "Car", "Reserve"].map((option, idx) => (
        <Box
          key={idx}
          textAlign="center"
          p={6}
          borderWidth="1px"
          borderRadius="lg"
          bg={useColorModeValue("white", "gray.700")}
          height="200px"
          boxShadow="lg"
          _hover={{ boxShadow: "2xl", cursor: "pointer", transform: "scale(1.05)" }}
          onClick={() => handleClick(option)}
        >
          <Image borderRadius="lg" src={`/Image${option}.png`} alt={option} boxSize="100px" />
          <Flex justify="center" align="center" mt={2}>
            <Text fontWeight="bold">{option}</Text>
            <ChevronRightIcon ml={2} />
          </Flex>
        </Box>
      ))}
    </Grid>
  </VStack>
      </Flex>

    
     
      <Modal isOpen={isHistoryOpen} onClose={onHistoryClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ride History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your previous rides will appear here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onHistoryClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

     
      <Modal isOpen={isShareOpen} onClose={onShareClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ride Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your ride share details will be displayed here.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onShareClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        as="footer"
        width="100%"
        bg={useColorModeValue("gray.100", "gray.800")}
        color={useColorModeValue("gray.800", "gray.100")}
        mt={8}
        py={6}
        px={4}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          maxW="1200px"
          mx="auto"
        >
         
          <HStack spacing={8} mb={{ base: 4, md: 0 }}>
            <Text fontWeight="bold" fontSize="lg">
              <a href="/about">About Us</a>
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              <a href="/terms">Terms of Service</a>
            </Text>
            <Text fontWeight="bold" fontSize="lg">
              <a href="/contact">Contact</a>
            </Text>
          </HStack>

         
          <HStack spacing={4}>
            <IconButton
              as="a"
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              size="lg"
              color={useColorModeValue("gray.600", "gray.400")}
              _hover={{ color: "#3b5998" }}
            />
            <IconButton
              as="a"
              href="https://www.twitter.com"
              target="_blank"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              size="lg"
              color={useColorModeValue("gray.600", "gray.400")}
              _hover={{ color: "#1DA1F2" }}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              size="lg"
              color={useColorModeValue("gray.600", "gray.400")}
              _hover={{ color: "#E4405F" }}
            />
          </HStack>
        </Flex>

       
        <Text textAlign="center" mt={4} fontSize="sm">
          &copy; {new Date().getFullYear()} RideShare. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
