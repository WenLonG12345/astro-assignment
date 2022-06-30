import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Header from "../common/Header";

const MainLayout = ({ children }) => {
  return (
    <Container maxW={"container.lg"} p={3}>
      <Header />
      {children}
    </Container>
  );
};

export default MainLayout;
