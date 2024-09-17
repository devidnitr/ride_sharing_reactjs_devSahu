import React from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Box, Select, VStack } from "@chakra-ui/react";

const ElementDemos = ({ demos }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <VStack spacing={8} width="100%" maxW="500px" mx="auto" py={8} height="100vh">
      <Box
        width="100%"
        p={3}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
      >
        <Select
          fontSize="lg"
          value={location.pathname}
          onChange={(event) => navigate(event.target.value)}
          bg="transparent"
          color="purple.600"
        >
          {demos.map(({ path, label }) => (
            <option key={path} value={path}>
              {label}
            </option>
          ))}
        </Select>
      </Box>

      <Box flex="1" width="100%" display="flex" justifyContent="center">
        <Routes>
          <Route path="/" element={<Navigate to={demos[0].path} replace />} />
          {demos.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Box>
    </VStack>
  );
};

export default ElementDemos;
