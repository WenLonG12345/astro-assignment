/* eslint-disable react/no-children-prop */
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
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
import FilterSection from "../components/channel/FilterSection";
import { CheckCircleIcon, Search2Icon, CloseIcon } from "@chakra-ui/icons";
import { isEmpty } from "lodash";

dayjs.extend(relativeTime);

const mapState = ({ channelModel, favouriteModel }) => ({
  channelModel,
  favouriteModel,
});

const HomePage = ({ channelModel, favouriteModel }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    isHd: false,
    category: undefined,
    language: undefined,
  });
  const [searchTerm, setSearchTerm] = useState(undefined);

  const { isOpen: isFilterOpen, onToggle: onFilterToggle } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onToggle: onSearchToggle,
    onClose: onSearchClose,
  } = useDisclosure();

  const { channelList, sortNumber, sortName } = channelModel || [];
  const { favouriteList } = favouriteModel || [];
  const dataLoading = useSelector(
    (state) => state.loading.effects.channelModel?.getAllChannel
  );

  useEffect(() => {
    if (router.isReady) {
      dispatch.channelModel.getAllChannel();
    }
  }, [dispatch, router.isReady]);

  const filterList = useMemo(() => {
    if (!isFilterOpen && !searchTerm) return channelList;

    if (searchTerm) {
      return channelList.filter(
        (channel) =>
          !(
            channel.title.toLowerCase().indexOf(searchTerm) === -1 &&
            channel.stbNumber.indexOf(searchTerm) === -1
          )
      );
    }

    const { isHd, category, language } = filters;

    return channelList.filter(
      (channel) =>
        (!isHd || channel.isHd === isHd) &&
        (!category || channel.category === category) &&
        (!language || channel.language === language)
    );
  }, [channelList, filters, isFilterOpen, searchTerm]);

  if (dataLoading && isEmpty(filterList)) {
    return (
      <Flex
        justify="center"
        align="center"
        h={{ base: "calc(100vh - 220px)", md: "calc(100vh - 180px)" }}
      >
        <Spinner color={colors.primary} size="lg" />
      </Flex>
    );
  }

  return (
    <Box minH={{ base: "calc(100vh - 220px)", md: "calc(100vh - 180px)" }}>
      <Flex
        justify={{ base: "start", md: "space-between" }}
        flexDir={{ base: "column", md: "row" }}
        mt={2}
      >
        <Heading>Channels</Heading>
        {isSearchOpen ? (
          <HStack mt={{ base: 3, md: 0 }}>
            <Input
              w="300px"
              placeholder="Type your keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton
              icon={<CloseIcon />}
              onClick={() => {
                setSearchTerm(undefined);
                onSearchClose();
              }}
            />
          </HStack>
        ) : (
          <HStack mt={{ base: 3, md: 0 }}>
            <IconButton icon={<Search2Icon />} onClick={onSearchToggle} />
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
            <Button
              leftIcon={<AiOutlineFilter />}
              rightIcon={isFilterOpen ? <CheckCircleIcon /> : null}
              onClick={onFilterToggle}
            >
              Filter
            </Button>
          </HStack>
        )}
      </Flex>

      {isFilterOpen && (
        <Collapse in={isFilterOpen} animateOpacity>
          <FilterSection filters={filters} setFilters={setFilters} />
        </Collapse>
      )}

      {isEmpty(filterList) ? (
        <Flex
          justify="center"
          align="center"
          flexDir="column"
          h={{ base: "calc(100vh - 350px)", md: "calc(100vh - 290px)" }}
        >
          <Image src="/not_found.svg" alt="not_found" w="300px" h="300px" />
          <Text>No Result</Text>
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 1, 2, 3, 3, 3]} gap={5} mt={10}>
          {filterList?.map((channel) => (
            <ChannelCard
              channel={channel}
              favouriteList={favouriteList}
              key={channel.id}
              onRedirect={(id) => router.push(`/channels/${id}`)}
              onFavourite={(channel) =>
                dispatch.favouriteModel.toggleFavourite(channel)
              }
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default connect(mapState)(HomePage);
