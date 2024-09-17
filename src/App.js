import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CardForm from "./components/CardForm";
import Register from './components/Register';
import Feedback from './components/Feedback';
import Ridepage from './components/Ridepage';
import Lastpage from './components/Lastpage';
import Profile from './components/Profile';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ElementDemos from "./components/ElementDemos";

const stripePromise = loadStripe("pk_test_51PzxH3DGUdPzQSZaBxrSOP4c905ybQCS2Wds1HMqkIdZQ6EnLPdrS8QazjlIZUZCw4GxeY7nCZOuK7SEzP6xeIwV0072GQSQNA");

const demos = [
  {
    path: "/card-element",
    label: "CardElement",
    component: CardForm,
  },
];

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/ridepage" element={<Ridepage />} />
        <Route path="/lastpage" element={<Lastpage />} />
        <Route path="/profile" element={<Profile />} />

       
        <Route
          path="/card-element"
          element={
            <Elements stripe={stripePromise}>
              <CardForm />
            </Elements>
          }
        />
        <Route
          path="/demos"
          element={
            <Elements stripe={stripePromise}>
              <ElementDemos demos={demos} />
            </Elements>
          }
        />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
