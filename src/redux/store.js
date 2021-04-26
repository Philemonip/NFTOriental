import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import browseItems from "./browseSlice";

const reducer = {
  browseItems: browseItems,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
