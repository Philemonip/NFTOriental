import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import browseItems from "./browseSlice";
import bancoSlice from "./Banco/bancoSlice";
import detailSlice from "./Marketplace/detailSlice"

const reducer = {
  // browseItems,
  banco: bancoSlice.reducer,
  detail: detailSlice.reducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
