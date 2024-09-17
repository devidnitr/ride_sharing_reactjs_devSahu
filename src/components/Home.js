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
  Stack
} from "@chakra-ui/react";
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
  const layout = useBreakpointValue({ base: "column", md: "row" });
  const imageSize = useBreakpointValue({ base: "60px", md: "120px" });
  const gridTemplateColumns = useBreakpointValue({ base: "1fr", md: "repeat(3, 1fr)" });
  const boxHeight = useBreakpointValue({ base: "120px", md: "200px" });

  const textColor = useColorModeValue("#763AD7", "purple.300");
  const sectionBgColor = useColorModeValue("gray.100", "gray.700");

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
    <Box p="6" maxW="100%" borderRadius="lg" boxShadow="xl" bg={useColorModeValue("white", "gray.900")}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" ml={20}>
          Request a ride for now or later
        </Text>

        <Flex align="center">
          <Button variant="ghost" onClick={onShareOpen}>
            Ride Share
          </Button>
          <Button variant="ghost" onClick={onHistoryOpen} ml={4}>
            Ride History
          </Button>

          <Menu>
            <MenuButton as={IconButton} icon={<MdNotifications />} variant="ghost" aria-label="Notifications" fontSize="3xl" />
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

      <Flex justify="space-between" align="center">
        {/* Left Side - Ride Request */}
        <Box flex="1" mr={8}>
          <Text 
            mb={4} 
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}  // Responsive font size
            fontWeight="semi-bold"  // Make the text bold
            color="#3F4BBB"   // Apply a stylish color
            textAlign="center" // Center the text
            lineHeight="tall"  // Add a taller line height for better readability
          >
            Add your trip details, hop in, and go.
          </Text>
          <Stack spacing={4}>
            {/* From Location Input */}
            <Input 
              placeholder="Enter location" 
              size="lg" 
              value={fromLocation ? `Lat: ${fromLocation.lat}, Lng: ${fromLocation.lng}` : ""} 
              readOnly 
            />

            {/* To Location Input */}
            <Input 
              placeholder="Enter destination" 
              size="lg" 
              value={toLocation ? `Lat: ${toLocation.lat}, Lng: ${toLocation.lng}` : ""} 
              readOnly 
            />
          </Stack>

          {/* Buttons for prices and scheduling */}
          <Stack direction="row" spacing={4} mt={6}>
            <Button colorScheme="purple" size="lg" boxShadow="md"
              _hover={{ transform: "scale(1.05)" }}
              onClick={() => navigate("/ridepage")}>
              See prices
            </Button>
            <Button variant="outline" size="lg">
              Schedule for later
            </Button>
          </Stack>
        </Box>

        {/* Right Side - Image */}
        <Box flex="1" h="400px" borderRadius="lg" overflow="hidden" mb={8}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {fromLocation && <Marker position={fromLocation} />}
            {toLocation && <Marker position={toLocation} />}
          </GoogleMap>
        </Box>
      </Flex>

      {/* Hero Section */}
      <Flex 
        direction={{ base: "column", md: "row" }}  // Stack vertically on mobile, row on larger screens
        alignItems="center"
        p={6} 
        mb={8} 
      >
        {/* Left side: Image */}
        <Box
          flex="1"
          height="400px" 
          borderRadius="lg"
          backgroundImage="url('/RideMain.jpg')" 
          backgroundSize="cover" 
          backgroundPosition="center" 
        />

        {/* Right side: Text and Grid content */}
        <VStack
          spacing={4}
          align="start"
          flex="1"
          color="gray.800"
          p={6}  // Padding for spacing
          minWidth="300px"  // Minimum width to ensure proper layout
        >
          {/* Text content */}
          <Box mb={4} flex="1">
            <Text fontSize={{ base: "2xl", md: "3xl" }} color='#9253D2' fontWeight="bold">
              Ready for a smooth ride?
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} color='#2E4ADC' mt={2}>
              Sit back, relax, and enjoy your trip.
            </Text>
          </Box>

          {/* Images Section */}
          <Box flex="1" width="full">
            <Text fontSize="xl" fontWeight="bold"  color='#9253D2' mb={4}>
              Explore by popular way
            </Text>
            <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} color='#9253D2' gap={4} mb={8}>
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
          </Box>
        </VStack>
      </Flex>

      {/* Modal for Ride History */}
      <Modal isOpen={isHistoryOpen} onClose={onHistoryClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ride History</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Past Rides:</Text>
            <VStack spacing={4} align="start">
              <Box>
                <Text>Date: 12th September 2023</Text>
                <Text>Fare: $15</Text>
                <Text>Driver: Ben Smith</Text>
              </Box>
              <Box>
                <Text>Date: 5th September 2023</Text>
                <Text>Fare: $20</Text>
                <Text>Driver: Jack </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onHistoryClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for Ride Share */}
      <Modal isOpen={isShareOpen} onClose={onShareClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ride Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Share your ride details:</Text>
            <VStack spacing={4} align="start">
              <Box>
                <Text>Date: 12th September 2023</Text>
                <Text>Fare: $15</Text>
                <Text>Driver: Max Gayle</Text>
              </Box>
              <Box>
                <Text>Share this ride with your friends:</Text>
                {/* Placeholder for share functionality */}
                <Button colorScheme="blue" onClick={() => alert("Sharing feature coming soon!")}>
                  Share Ride
                </Button>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onShareClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    </Box>
  );
}
