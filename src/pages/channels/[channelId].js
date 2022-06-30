import { Box, Container, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import ChannelDetailsHeader from "../../components/channel/ChannelDetailsHeader";
import ChannelDetailsTabs from "../../components/channel/ChannelDetailsTabs";

const mapState = ({ channelModel }) => ({
  selectedChannel: channelModel.selectedChannel,
});

const ChannelDetailsPage = ({selectedChannel}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { channelId } = router.query;

  const textColor = useColorModeValue('gray.700', "gray.300")

  useEffect(() => {
    dispatch.channelModel.getSelectedChannel({ id: channelId });

    return () => dispatch.channelModel.resetSelectedChannel();
  }, [router.isReady, dispatch, channelId]);

  console.log('details', {selectedChannel});

  return (
    <Container maxW={'container.md'}>
      <ChannelDetailsHeader {...selectedChannel}/>
      <ChannelDetailsTabs {...selectedChannel} textColor={textColor}/>
    </Container>
  );
};

export default connect(mapState)(ChannelDetailsPage);
