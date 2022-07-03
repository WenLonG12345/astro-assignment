/* eslint-disable react/jsx-key */
import {
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { weekday } from "../../utils/constants";

const ChannelDetailsTabs = ({ schedule, textColor }) => {
  if (!schedule) return <></>;

  let date = Object.keys(schedule);
  let events = Object.values(schedule);

  return (
    <Tabs overflowX='auto'>
      <TabList>
        {date?.map((d) => {
          const dt = new Date(d);
          return <Tab key={d}>{weekday[dt.getDay()]}</Tab>;
        })}
      </TabList>

      <TabPanels>
        {events?.map((event) => {
          return (
            <TabPanel>
              {event.map((e) => {
                const isHappening = dayjs().diff(e?.datetime, "m") >= 0;
                return (
                  <HStack fontWeight={isHappening ? "bold" : "normal"}>
                    <Text mr={5} color={textColor}>
                      {isHappening
                        ? "On Now"
                        : dayjs(e?.datetime).format("hh:mm A")}
                    </Text>
                    <Text color={textColor}>{e?.title}</Text>
                  </HStack>
                );
              })}
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default ChannelDetailsTabs;
