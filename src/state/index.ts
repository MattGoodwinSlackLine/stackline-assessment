import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./app/app.reducer";
import { fetchContent } from "../services";

const preloadedState = {};

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: fetchContent,
      },
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
