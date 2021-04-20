import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const reducer = {
  //List of Reducers
  //linksReducer: linksReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
