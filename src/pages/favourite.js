import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { colors, systemHeight } from "../utils/constants";
import FavouriteChannelCard from "../components/channel/FavouriteChannelCard";
import { useRouter } from "next/router";

const mapState = ({ favouriteModel }) => ({
  favouriteModel,
});

const FavouritePage = ({ favouriteModel }) => {
  const { favouriteList } = favouriteModel || [];
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Box h={{base: 'calc(100vh - 220px)', md: 'calc(100vh - 180px)'}}>
      {isEmpty(favouriteList) ? (
        <Stack
          justify="center"
          align="center"
          minH={"76vh"}
          flexDir="column"
          spacing={3}
        >
          <Text>No favourite channel at this moment</Text>
          <Button onClick={() => router.push("/")}>Go to home</Button>
        </Stack>
      ) : (
        <Box>
          <Heading>Favourite List</Heading>
          <SimpleGrid columns={[1, 1, 2, 3, 3, 3]} gap={5} mt={10}>
            {favouriteList?.map((channel) => (
              <FavouriteChannelCard
                channel={channel}
                key={channel.id}
                onRedirect={(id) => router.push(`/channels/${id}`)}
                onDelete={(channel) =>
                  dispatch.favouriteModel.deleteFavourite(channel)
                }
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default connect(mapState)(FavouritePage);
