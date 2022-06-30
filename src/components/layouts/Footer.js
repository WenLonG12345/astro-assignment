import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineGlobal } from "react-icons/ai";

const Footer = () => {
  return (
    <Flex
      py={3}
      px={20}
      backgroundColor={useColorModeValue("blackAlpha.100", "blackAlpha.500")}
      justify={{ base: "center", md: "space-between" }}
      align='center'
      textAlign={{ base: "center", md: "start" }}
      flexDir={{ base: "column", md: "row" }}
    >
      <Text>
        © {new Date().getFullYear()} MEASAT Broadcast Network Systems Sdn Bhd.
        All rights reserved
      </Text>

      <Button
        as={Link}
        href="https://www.astro.com.my/"
        isExternal
        width='50px'
        height='50px'
      >
        <AiOutlineGlobal size="20" />
      </Button>
    </Flex>
  );
};

export default Footer;
