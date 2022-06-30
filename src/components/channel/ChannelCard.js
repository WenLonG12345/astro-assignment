import {
  Badge,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { isEmpty } from "lodash";
import { BiLinkExternal, BiMoviePlay } from "react-icons/bi";
import { MotionBox } from "../../utils/motion";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const ChannelCard = ({ channel, onRedirect }) => {
  const {
    id,
    title,
    description,
    isHd,
    stbNumber,
    language,
    category,
    imageUrl,
    isAstroGoExclusive,
    filters,
    detailUrl,
    currentSchedule,
  } = channel || {};

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      boxShadow={"lg"}
      rounded={"lg"}
      p={4}
      cursor="pointer"
      onClick={() => onRedirect(id)}
      backgroundColor={useColorModeValue("white", "#2d3137")}
    >
      <Flex flexDir={"row"} align="center">
        <Center
          w="70px"
          h="60px"
          mr={4}
          backgroundColor={useColorModeValue("white", "gray.700")}
          borderRadius="8px"
          p={2}
        >
          <Image src={imageUrl} alt={id} fallback={<BiMoviePlay size={25} />} />
        </Center>

        <Box>
          <Text fontSize="12px">{`CH ${stbNumber}`}</Text>
          <Text fontWeight="600" fontSize="13px">
            {title}
          </Text>
        </Box>
      </Flex>

      <HStack my={2}>
        {isAstroGoExclusive && (
          <Badge colorScheme="green">Astro Go Exclusive</Badge>
        )}
        {isHd && <Badge colorScheme="blue">HD</Badge>}
      </HStack>

      <Divider color={"gray.400"} my={2} />

      {!isEmpty(currentSchedule) ? (
        currentSchedule?.map((schedule) => {
          const isHappening = dayjs().diff(schedule.datetime, "m") >= 0;
          return (
            <HStack
              key={schedule.eventId}
              spacing={2}
              fontWeight={isHappening ? "bold" : "normal"}
            >
              <Text fontSize="12px">
                {isHappening
                  ? "On Now"
                  : dayjs(schedule.datetime).format("hh:mm A")}
              </Text>
              <Text fontSize="12px" noOfLines={1}>
                {schedule.title}
              </Text>
            </HStack>
          );
        })
      ) : (
        <Flex justifyContent="center" align="center">
          <Text fontSize="12px" fontWeight="500">
            No Schedule at this moment.
          </Text>
        </Flex>
      )}
    </MotionBox>
  );
};

export default ChannelCard;
