import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import browseSlice from "./Marketplace/browseSlice";
import bancoSlice from "./Banco/bancoSlice";
import detailSlice from "./Marketplace/detailSlice";
import nftSlice from "./NFT/nftSlice";
import mintingSlice from "./Minting/mintingSlice";

const reducer = {
	browse: browseSlice.reducer,
	banco: bancoSlice.reducer,
	detail: detailSlice.reducer,
	nft: nftSlice.reducer,
	mint: mintingSlice.reducer,
};

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
