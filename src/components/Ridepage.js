import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  IconButton,
  Flex,
  HStack,
  VStack,
  Avatar,
  Divider,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Ridepage = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [fromLocation, setFromLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [toLocation, setToLocation] = useState({ lat: 37.7849, lng: -122.4094 });

  const [selectedRide, setSelectedRide] = useState(null); 

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const rides = [
    {
      type: 'Micro',
      price: '₹123.03',
      passengers: 4,
      time: '12:34 pm - 2 min away',
      cheaper: true,
      imageSrc: '/car.png',
    },
    {
      type: 'Black SUV',
      price: '₹133.03',
      passengers: 4,
      time: '12:34 pm - 2 min away',
      cheaper: true,
      imageSrc: '/blacksuv.png',
    },
    {
      type: 'Sedan',
      price: '₹143.03',
      passengers: 4,
      time: '12:34 pm - 2 min away',
      cheaper: false,
      imageSrc: '/sedan.png',
    },
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '200px',
  };

  const center = { lat: 37.7749, lng: -122.4194 };

  const bgColor = useColorModeValue('purple.100', 'gray.700');
  const sectionBgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  const handleRideSelection = (index) => {
    setSelectedRide(index);
  };

  return (
    <Box bg={bgColor} height="100vh" p={4}>
      <Box position="relative">
        <IconButton
          icon={<ArrowBackIcon />}
          position="absolute"
          top="1rem"
          left="1rem"
          zIndex={10}
          bg="white"
          size="lg"
          borderRadius="full"
          onClick={() => navigate(-1)}
        />

        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          position="absolute"
          top="1rem"
          right="4.5rem"
          zIndex={10}
          bg="white"
          size="lg"
          borderRadius="full"
          onClick={toggleColorMode}
        />

        <Box bg="gray.100" height="200px" borderRadius="lg" mb={4}>
          {isLoaded ? (
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
              {fromLocation && <Marker position={fromLocation} label="From" />}
              {toLocation && <Marker position={toLocation} label="To" />}
            </GoogleMap>
          ) : (
            <Flex align="center" justify="center" height="100%" color="gray.500" fontSize="lg">
              Loading Map...
            </Flex>
          )}
        </Box>
      </Box>

      <VStack
        bg={sectionBgColor}
        color={textColor}
        p={4}
        borderRadius="lg"
        shadow="md"
        spacing={4}
        divider={<Divider />}
      >
        <Text fontSize="lg" fontWeight="bold">
          Choose a ride
        </Text>
        {rides.map((ride, index) => (
          <HStack
            key={index}
            justifyContent="space-between"
            width="100%"
            p={2}
            borderRadius="md"
            bg={selectedRide === index ? 'blue.200' : 'gray.50'} 
            onClick={() => handleRideSelection(index)} 
            cursor="pointer" 
          >
            <Flex align="center">
              <Avatar src={ride.imageSrc} mr={3} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">{ride.type}</Text>
                <Text fontSize="sm" color="gray.500">
                  {ride.time}
                </Text>
                {ride.cheaper && (
                  <Text fontSize="xs" bg="green.200" color="green.700" px={2} borderRadius="md">
                    Cheaper
                  </Text>
                )}
              </VStack>
            </Flex>
            <VStack align="end" spacing={0}>
              <Text fontWeight="bold">{ride.price}</Text>
              <Text fontSize="xs" color="gray.500">
                {ride.passengers} passengers
              </Text>
            </VStack>
          </HStack>
        ))}

        <Button
          colorScheme="purple"
          width="100%"
          onClick={() => {
            if (selectedRide !== null) {
              navigate('/lastpage', { state: { ride: rides[selectedRide] } }); 
            } else {
              alert('Please select a ride first!');
            }
          }}
        >
          Choose RideX
        </Button>
      </VStack>
    </Box>
  );
};

export default Ridepage;
