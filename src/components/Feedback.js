import React, { useState } from "react";
import {
  Box,
  Center,
  Flex,
  Text,
  Button,
  Textarea,
  VStack,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, CheckCircleIcon } from "@chakra-ui/icons"; 
import { FaCar, FaCheckCircle } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

export default function Feedback() {
  const navigate = useNavigate();
  const layout = useBreakpointValue({ base: "column", md: "row" });

  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode(); 
  const bg = useColorModeValue("white", "gray.800"); 
  const boxBg = useColorModeValue("gray.100", "gray.700"); 
  const textColor = useColorModeValue("black", "white"); 

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmit = () => {
    setSubmitted(true);
    setFeedback(""); 
  };

  return (
    <Box
      p="5"
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg={bg} 
      color={textColor}
    >
     
      <Center flexDirection="column" mb={8}>
        <Icon as={FaCheckCircle} w={16} h={16} color="green.400" mb={4} />
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="green.400">
          Your Ride is Confirmed!
        </Text>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          You can now sit back and relax while we get your ride ready.
        </Text>
      </Center>

     
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="#763AD7">
          We Value Your Feedback
        </Text>

       
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          isRound
          size="lg"
          aria-label="Toggle light/dark mode"
        />
      </Flex>

      <Text fontSize="md" mb={4}>
        Share your thoughts with us
      </Text>

     
      <Box
        p="4"
        borderWidth="1px"
        borderRadius="lg"
        bg={boxBg} 
        mb={6}
        display={layout}
        alignItems="center"
      >
        <VStack spacing={4} align="start" width="full">
          <Text fontSize="lg" fontWeight="bold">
            Your Feedback
          </Text>
          <Textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={handleFeedbackChange}
            bg={useColorModeValue("gray.50", "gray.600")} 
            color={textColor}
          />
          <Button colorScheme="purple" width="full" onClick={handleSubmit}>
            Submit Feedback
          </Button>
        </VStack>
      </Box>

      
      {submitted && (
        <Box mb={6} p="4" borderWidth="1px" borderRadius="lg" bg={boxBg}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Thank you for your feedback!
          </Text>
          <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
            We appreciate you taking the time to share your thoughts with us.
          </Text>
        </Box>
      )}

      
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Explore More
      </Text>
      <Flex justify="center" mb={6}>
        <Button colorScheme="purple" mr={4} onClick={() => navigate('/')}>
          Home
        </Button>
        <Button colorScheme="purple" onClick={() => navigate('/')}>
          Ride Now
        </Button>
      </Flex>
    </Box>
  );
}
