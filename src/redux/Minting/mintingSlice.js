import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const initialState = {
	file: null,
	price: null,
	name: null,
	category: null,
	image: null,
	externalUrl: null,
	description: null,
};

const mintingSlice = createSlice({
	name: "mint",
	initialState,
	reducers: {
		updateFile(state, action) {
			state.file = action.payload;
		},
		updatePrice(state, action) {
			state.price = action.payload;
		},
		updateName(state, action) {
			state.name = action.payload;
		},
		updateCategory(state, action) {
			state.category = action.payload;
		},
		updateImage(state, action) {
			state.image = action.payload;
		},
		updateExternalUrl(state, action) {
			state.externalUrl = action.payload;
		},
		updateDescription(state, action) {
			state.description = action.payload;
		},
	},
});

export const mintingSliceActions = mintingSlice.actions;

export const uploadToImgurThunk = (data) => async (dispatch) => {
	const uploadToImgur = async () => {
		return axios
			.post(`http://localhost:8000/upload/uploadimgur`, data)
			.then((data) => data.data);
	};
	try {
		let imageUrl = await uploadToImgur();
		dispatch(mintingSliceActions.updateImage(imageUrl));

		return imageUrl;
	} catch (err) {
		console.log("uplosd to imgur fail", err);
	}
};

export const mintNFTThunk = (newNftInfo) => async (dispatch) => {
	console.log("mintnew");
	const mintNewNFT = async () => {
		return axios.post(`http://localhost:8000/upload/newnftinfo`, newNftInfo);
	};
	try {
		mintNewNFT();
		console.log("done hello");
		// let imageUrl = await uploadToImgur();
		// dispatch(mintingSliceActions.updateImage(imageUrl));
	} catch (err) {
		console.log("add nft info fail", err);
	}
};

export default mintingSlice;
