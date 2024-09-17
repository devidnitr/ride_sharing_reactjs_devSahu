import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { 
  Box, 
  FormControl, 
  FormLabel, 
  Button, 
  Heading, 
  Flex, 
  useColorModeValue, 
  Text, 
  VStack, 
  IconButton, 
  useColorMode 
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import useResponsiveFontSize from "../useResponsiveFontSize";
import { useNavigate } from "react-router-dom";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CardForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log("[PaymentMethod]", payload);
  };

 
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const formBg = useColorModeValue("white", "gray.800");

  
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      px={4}
      position="relative" 
    >
     
      <IconButton
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        position="absolute"
        top="1rem"
        right="1rem"
        size="lg"
        isRound
        onClick={toggleColorMode}
        aria-label="Toggle light/dark mode"
      />

      <Box
        as="form"
        onSubmit={handleSubmit}
        p={8}
        maxWidth="500px"
        width="100%"
        bg={formBg}
        borderRadius="lg"
        shadow="xl"
      >
       
        <VStack spacing={3} mb={6}>
          <Heading size="lg" color="purple.600" textAlign="center">
            Payment Details
          </Heading>
          <Text color="gray.500" textAlign="center">
            Securely complete your payment below.
          </Text>
        </VStack>

       
        <FormControl>
          <FormLabel fontWeight="bold" color="gray.600">
            Card Details
          </FormLabel>
          <Box
            p={4}
            borderWidth="2px"
            borderRadius="md"
            borderColor="purple.400"
            bg="white"
            mb={4}
            shadow="sm"
          >
            <CardElement
              options={options}
              onReady={() => {
                console.log("CardElement [ready]");
              }}
              onChange={(event) => {
                console.log("CardElement [change]", event);
              }}
              onBlur={() => {
                console.log("CardElement [blur]");
              }}
              onFocus={() => {
                console.log("CardElement [focus]");
              }}
            />
          </Box>
        </FormControl>

       
        <Button
          onClick={() => navigate('/feedback')}
          type="submit"
          colorScheme="purple"
          size="lg"
          width="100%"
          mt={4}
          isDisabled={!stripe}
          shadow="md"
          _hover={{ bg: "purple.500" }}
        >
          Pay Now
        </Button>
      </Box>
    </Flex>
  );
};

export default CardForm;
