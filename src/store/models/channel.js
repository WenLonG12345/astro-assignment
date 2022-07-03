/* eslint-disable import/no-anonymous-default-export */
import { sortSequence } from "../../utils/constants";
import request from "../../utils/request";
import { isEmpty, sortBy } from "lodash";
import { createStandaloneToast } from "@chakra-ui/react";

const apiUrl = process.env.API_URL;
const { toast } = createStandaloneToast();

export default {
  state: {
    channelList: [],
    selectedChannel: undefined,
    sortNumber: sortSequence.ascending,
    sortName: sortSequence.ascending,
  },
  reducers: {
    updateChannelList: (state, payload) => {
      return { ...state, channelList: payload };
    },

    toggleSortNumber: (state) => {
      const { channelList, sortNumber } = state;
      const seq =
        sortNumber === sortSequence.ascending
          ? sortSequence.desending
          : sortSequence.ascending;

      return {
        ...state,
        channelList:
          sortNumber === sortSequence.ascending
            ? sortBy(channelList, "stbNumber").reverse()
            : sortBy(channelList, "stbNumber"),
        sortNumber: seq,
      };
    },

    toggleSortName: (state) => {
      const { channelList, sortName } = state;
      const seq =
        sortName === sortSequence.ascending
          ? sortSequence.desending
          : sortSequence.ascending;

      return {
        ...state,
        channelList:
          sortName === sortSequence.ascending
            ? sortBy(channelList, "title").reverse()
            : sortBy(channelList, "title"),
        sortName: seq,
      };
    },

    updateSelectedChannel: (state, payload) => {
      return { ...state, selectedChannel: payload };
    },

    resetSelectedChannel: (state) => {
      return { ...state, selectedChannel: undefined };
    },
  },
  effects: (dispatch) => ({
    async getAllChannel() {
      const res = await request(`${apiUrl}/channel/all.json`);

      const { status, data } = res;

      if (status === 200) {
        const { response } = data || {};
        if (response) {
          this.updateChannelList(response);
        }
      }
    },

    async getSelectedChannel(payload) {
      const { id } = payload;

      const res = await request(`${apiUrl}/channel/${id}.json`);

      const { status, data } = res;

      if (status === 200) {
        const { response } = data || {};
        if (response) {
          this.updateSelectedChannel(response);
        }
      }
    },
  }),
};
