import { init } from "@rematch/core";
import channelModel from './models/channel';
import loadingPlugin from '@rematch/loading';
import storage from 'redux-persist/lib/storage';
import persistPlugin from "@rematch/persist";

// const persistConfig = {
//   key: 'root', 
//   storage,
//   blacklist: ['cartModel']
// }

const store = init({
  models: {
    channelModel
  },
  plugins: [
    loadingPlugin(),
  ],
  redux: {
    rootReducers: {
      RESET_ALL_STATE: () => undefined
    }
  }
})

export default store;