import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ChannelCard from "../components/channel/ChannelCard";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { colors, sortSequence } from "../utils/constants";
import {
  AiOutlineFilter,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { BsSortNumericDown, BsSortNumericUpAlt } from "react-icons/bs";

dayjs.extend(relativeTime);

const mapState = ({ channelModel }) => ({
  channelModel,
});

const HomePage = ({ channelModel }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { channelList, sortNumber, sortName } = channelModel || [];
  const dataLoading = useSelector(
    (state) => state.loading.effects.channelModel.getAllChannel
  );

  useEffect(() => {
    if (router.isReady) {
      dispatch.channelModel.getAllChannel();
    }
  }, [dispatch, router.isReady]);

  if (dataLoading) {
    return (
      <Flex justify='center' align='center'>
        <Spinner color={colors.primary} size="lg" />
      </Flex>
    );
  }

  return (
    <Box>
      <Flex justify={"space-between"}>
        <Heading>All Channels</Heading>
        <HStack>
          {/* <Input maxW='300px'/> */}
          <IconButton
            icon={
              sortName === sortSequence.ascending ? (
                <AiOutlineSortAscending />
              ) : (
                <AiOutlineSortDescending />
              )
            }
            onClick={() => {
              dispatch.channelModel.toggleSortName();
            }}
          />
          <IconButton
            icon={
              sortNumber === sortSequence.ascending ? (
                <BsSortNumericDown />
              ) : (
                <BsSortNumericUpAlt />
              )
            }
            onClick={() => dispatch.channelModel.toggleSortNumber()}
          />
          <Button leftIcon={<AiOutlineFilter />}>Filter</Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={[1, 1, 2, 3, 3, 3]} gap={5} mt={10}>
        {channelList?.map((channel) => (
          <ChannelCard
            channel={channel}
            key={channel.id}
            onRedirect={(id) => router.push(`/channels/${id}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default connect(mapState)(HomePage);
