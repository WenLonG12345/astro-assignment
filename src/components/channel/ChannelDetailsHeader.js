import {
  Center,
  Flex,
  Image,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BiMoviePlay } from "react-icons/bi";

const ChannelDetailsHeader = ({
  imageUrl,
  id,
  stbNumber,
  title,
  description,
}) => {
  return (
    <Box mb={5}>
      <Flex flexDir={"row"} align="center">
        <Center
          w="100px"
          h="100px"
          mr={4}
          backgroundColor={useColorModeValue("white", "gray.700")}
          borderRadius="8px"
          p={2}
        >
          <Image src={imageUrl} alt={id} fallback={<BiMoviePlay size={25} />} />
        </Center>

        <Box>
          <Text>{`CH ${stbNumber}`}</Text>
          <Text fontWeight="600" fontSize="16px">
            {title}
          </Text>
        </Box>
      </Flex>

      <Text mt={3}>{description}</Text>
    </Box>
  );
};

export default ChannelDetailsHeader;
