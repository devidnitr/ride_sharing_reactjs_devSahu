import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  IconButton,
  Flex,
  HStack,
  VStack,
  Divider,
  Image,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const Lastpage = () => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedRide, setSelectedRide] = useState(null); 

  const bgColor = useColorModeValue('purple.100', 'gray.800');
  const sectionBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('black', 'white');

  const [fromLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [toLocation] = useState({ lat: 37.7849, lng: -122.4094 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

 
  const rides = [
    {
      route: 'Economy',
      price: '₹123.03',
      time: '3:00 pm',
      preferences: 'Matches Preferences',
      alerts: 'No alerts',
      imageSrc: '/blacksuv.png', 
    },
    {
      route: 'Rental',
      price: '₹133.03',
      time: '3:15 pm',
      preferences: 'Matches Preferences',
      alerts: 'No alerts',
      imageSrc: '/car.png', 
    },
    {
      route: 'Premium',
      price: '₹153.03',
      time: '3:25 pm',
      preferences: 'Matches Preferences',
      alerts: 'No alerts',
      imageSrc: '/sedan.png',
    },
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '200px',
  };

  const center = { lat: 37.7749, lng: -122.4194 };

  const handleRideSelection = (index) => {
    setSelectedRide(index);
  };

  return (
    <Box bg={bgColor} height="100vh" p={4} width="100vw" mx="auto">
      <Box position="relative" width="100%">
       
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
          right="5rem"
          zIndex={10}
          bg="white"
          size="lg"
          borderRadius="full"
          onClick={toggleColorMode}
        />

        <Box bg="gray.100" height="200px" borderRadius="lg" mb={4} width="100%">
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
        p={4}
        borderRadius="lg"
        shadow="md"
        spacing={4}
        divider={<Divider />}
        width="100%"
        color={textColor}
      >
        <Text fontSize="lg" fontWeight="bold">
          Choose a ride
        </Text>
        <Text fontSize="md" color="blue.600" alignSelf="start">
          Recommended route
        </Text>

        {rides.map((ride, index) => (
          <VStack
            key={index}
            align="start"
            bg={selectedRide === index ? 'blue.200' : 'gray.50'} 
            p={4}
            borderRadius="md"
            width="100%"
            boxShadow="sm"
            cursor="pointer"
            onClick={() => handleRideSelection(index)} 
          >
            <HStack justify="space-between" width="100%">
              <HStack>
              
                <Image src={ride.imageSrc} boxSize="40px" alt="Route Icon" />
                <VStack align="start" spacing={0}>
                  <Text fontSize="lg" fontWeight="bold">
                    {ride.route}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {ride.preferences}
                  </Text>
                </VStack>
              </HStack>

              <VStack align="end" spacing={0}>
                <Text fontWeight="bold">{ride.time}</Text>
                <Button colorScheme="purple" variant="solid">
                  {ride.price}
                </Button>
              </VStack>
            </HStack>

            <Text fontSize="sm" color="gray.500">
              {ride.alerts}
            </Text>
          </VStack>
        ))}

        <Button
          colorScheme="purple"
          width="100%"
          onClick={() => {
            if (selectedRide !== null) {
              navigate('/card-element', { state: { ride: rides[selectedRide] } }); 
            } else {
              alert('Please select a ride first!');
            }
          }}
        >
          Confirm Ride
        </Button>
      </VStack>
    </Box>
  );
};

export default Lastpage;
