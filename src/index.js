import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import App from "./App";

const stripePromise = loadStripe("pk_test_51PzxH3DGUdPzQSZaBxrSOP4c905ybQCS2Wds1HMqkIdZQ6EnLPdrS8QazjlIZUZCw4GxeY7nCZOuK7SEzP6xeIwV0072GQSQNA");

const rootElement = document.getElementById("root");

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>,
  rootElement
);
