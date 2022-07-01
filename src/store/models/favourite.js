import { createStandaloneToast } from "@chakra-ui/react";

/* eslint-disable import/no-anonymous-default-export */
const apiUrl = process.env.API_URL;
const { toast } = createStandaloneToast();

export default {
  state: {
    favouriteList: [],
  },
  reducers: {
    toggleFavourite: (state, payload) => {
      const { id } = payload;

      const isItemExist = state.favouriteList?.some((item) => item.id === id);
      // make a copy of the existing array
      let newList = state.favouriteList.slice();

      if (isItemExist) {
        newList = newList?.filter((item) => item.id !== id);
      } else {
        newList.push(payload);
      }
      return { ...state, favouriteList: newList };
    },
    
    deleteFavourite: (state, payload) => {
      return {
        ...state,
        favouriteList: state.favouriteList.filter(
          (item) => item.id !== payload.id
        ),
      };
    },
  },
  effects: (dispatch) => ({}),
};
