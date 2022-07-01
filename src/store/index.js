import { init } from "@rematch/core";
import channelModel from './models/channel';
import favouriteModel from './models/favourite';
import loadingPlugin from '@rematch/loading';
import storage from 'redux-persist/lib/storage';
import persistPlugin from "@rematch/persist";

const persistConfig = {
  key: 'root', 
  storage,
  whitelist: ['favouriteModel']
}

const store = init({
  models: {
    channelModel,
    favouriteModel,
  },
  plugins: [
    loadingPlugin(),
    persistPlugin(persistConfig)
  ],
  redux: {
    rootReducers: {
      RESET_ALL_STATE: () => undefined
    }
  }
})

export default store;