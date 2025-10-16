import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import postSlice from "./slices/postSlice";
// import socketSlice from "./slices/socketSlice";
import chatSlice from "./slices/chatSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(rootPersistConfig, authSlice);
const persistedPostReducer = persistReducer(rootPersistConfig, postSlice);
// const persistedSocketReducer = persistReducer(rootPersistConfig, socketSlice);
const persistedChatReducer = persistReducer(rootPersistConfig, chatSlice);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: persistedAuthReducer,
      post: persistedPostReducer,
      // socketio: persistedSocketReducer,
      chat: persistedChatReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  return store;
};

export const persistor = (store) => persistStore(store);
