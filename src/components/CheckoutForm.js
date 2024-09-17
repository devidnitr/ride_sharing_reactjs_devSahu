
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Text } from '@chakra-ui/react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
     
    }

    setProcessing(false);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <Text mb={4}>Enter your payment details:</Text>
      <CardElement />
      <Button type="submit" colorScheme="purple" mt={4} isLoading={isProcessing}>
        Pay Now
      </Button>
    </Box>
  );
};

export default CheckoutForm;
