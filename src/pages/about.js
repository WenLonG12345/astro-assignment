import {
  Box,
  Heading,
  HStack,
  Link,
  ListIcon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import { systemHeight, techStackList } from "../utils/constants";
import { BiLinkExternal } from "react-icons/bi";

const AboutPage = () => {
  return (
    <Box h={{ base: "calc(100vh - 220px)", md: "calc(100vh - 180px)" }}>
      <Heading>Tech Stack</Heading>

      <UnorderedList mt={3}>
        {techStackList?.map((tech) => (
          <ListItem key={tech}>
            <HStack>
              <Text fontWeight="600">{tech.title}</Text>
              <Link isExternal href={tech.url}>
                <BiLinkExternal cursor="pointer" />
              </Link>
            </HStack>
            <Text>{tech.description}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default AboutPage;
