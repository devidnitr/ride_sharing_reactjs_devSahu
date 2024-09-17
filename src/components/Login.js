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
  Link,
  IconButton,
  useColorMode, 
  useColorModeValue, 
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  // Updated colors for light and dark modes
  const bg = useColorModeValue('white', 'gray.800'); 
  const textColor = useColorModeValue('blue.900', 'blue.300'); // Dark blue/violet for both modes
  const inputBg = useColorModeValue('gray.50', 'gray.600'); // Input background colors

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) {
      toast({
        title: "Logged in.",
        description: "You've successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/'); 
    } else {
      toast({
        title: "Error.",
        description: "Please enter valid email and password.",
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

      <Box width="100%" maxWidth="400px" bg="white" p={6} boxShadow="md" borderWidth={1} borderRadius="md">
        <Stack spacing={4}>
          <Text fontSize="2xl" textAlign="center" color="#763AD7">Login</Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired>
              <FormLabel color={textColor}>Email address</FormLabel>
              <Input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                bg={inputBg} 
                color={textColor}
              />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel color={textColor}>Password</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                bg={inputBg} 
                color={textColor}
              />
            </FormControl>
            <Button 
              type="submit" 
              colorScheme="purple" 
              width="full" 
              mt={4}
            >
              Login
            </Button>
          </form>

          <Text textAlign="center" mt={4} color={textColor}>
            New user?{" "}
            <Link color="purple.500" onClick={() => navigate('/register')}>
              Create an account
            </Link>
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
