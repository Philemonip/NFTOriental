import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import browseItems from "./browseSlice";
import bancoSlice from "./Banco/bancoSlice";

const reducer = {
  // browseItems,
  banco: bancoSlice.reducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
