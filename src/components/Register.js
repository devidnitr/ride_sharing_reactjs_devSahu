import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
  Text, 
  useToast, 
  IconButton, 
  useColorMode, 
  useColorModeValue 
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); 
  const textColor = useColorModeValue('blue.600', 'blue.300'); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && password === confirmPassword) {
      toast({
        title: "Account created.",
        description: "You've successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } else {
      toast({
        title: "Error.",
        description: "Please check your inputs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={bg} height="100vh" display="flex" justifyContent="center" alignItems="center" p={4}>
      
      <IconButton
        position="absolute"
        top="1rem"
        right="1rem"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        isRound
        size="lg"
        aria-label="Toggle light/dark mode"
      />

      <Box width="100%" maxWidth="400px" bg="white" p={6} boxShadow="md" borderWidth={1} borderRadius="md" color={textColor}>
        <Stack spacing={4}>
          <Text fontSize="2xl" textAlign="center" color="#763AD7">Register</Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel color={textColor}>Email address</FormLabel>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                bg={useColorModeValue('gray.50', 'gray.600')} 
                color={textColor}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel color={textColor}>Password</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                bg={useColorModeValue('gray.50', 'gray.600')} 
                color={textColor}
              />
            </FormControl>
            <FormControl id="confirm-password" isRequired mt={4}>
              <FormLabel color={textColor}>Confirm Password</FormLabel>
              <Input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                bg={useColorModeValue('gray.50', 'gray.600')} 
                color={textColor}
              />
            </FormControl>
            <Button 
              type="submit" 
              colorScheme="purple" 
              width="full" 
              mt={4}
            >
              Register
            </Button>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
