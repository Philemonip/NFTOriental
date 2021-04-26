import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import browseItemsSlice from "./browseSlice";

const reducer = {
  browseItems: browseItemsSlice,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
