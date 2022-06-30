import React from "react";
import {
  Box,
  Flex,
  Container,
  HStack,
  useDisclosure,
  IconButton,
  Link,
  Stack,
  Image,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { headerLinks, colors } from "../../utils/constants";
import { useRouter } from "next/router";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let router = useRouter();
  let { asPath } = router;

  const headerItem = (
    <>
      {headerLinks.map((link) => (
        <NextLink href={link.route} key={link.title} passHref>
          <Link
            href={link.route}
            px={2}
            py={1}
            rounded="md"
            _hover={{
              textDecoration: "none",
              bg: "gray.300",
              color: "gray.700",
            }}
            color={link.route === asPath ? colors.primary : "gray.700"}
            onClick={isOpen ? onClose : onOpen}
          >
            <Text fontWeight={"bold"} noOfLines={1} fontSize={"18px"}>
              {link.title}
            </Text>
          </Link>
        </NextLink>
      ))}
    </>
  );

  return (
    <Box
      sx={{
        position: "-webkit-sticky",
        position: "sticky" /* Safari */,
        top: "0",
        zIndex: "99",
      }}
      pb={4}
      backgroundColor="rgba(255, 255, 255, 0.8)"
      backdropFilter="saturate(180%) blur(5px)"
      w="100%"
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx="auto"
        maxW={"container.xl"}
        py={5}
      >
        <HStack
          as={Link}
          spacing={4}
          alignItems={"center"}
          href="/"
          _hover={{ textDecoration: "none" }}
        >
          <Box w="100px" h="50px">
            <Image size="md" src="/logo.png" alt="logo" />
          </Box>
        </HStack>

        {/* LARGE SCREEN */}
        <HStack as="nav" spacing="4" display={{ base: "none", md: "flex" }}>
          {headerItem}
        </HStack>

        {/* BASE SCREEN */}
        <HStack display={{ base: "inherit", md: "none" }} spacing={3}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>

      {isOpen && (
        <Box
          py={4}
          w={["100%", "100%", "80%"]}
          maxW={"container.lg"}
          display={{ base: "inherit", md: "none" }}
        >
          <Stack as={"nav"} spacing={4}>
            {headerItem}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header;
