import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { systemHeight } from "../../utils/constants";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Header/>
      <Container maxW={"container.lg"} p={3}>
        {children}
      </Container>
      <Footer/>
    </Box>
  );
};

export default MainLayout;
