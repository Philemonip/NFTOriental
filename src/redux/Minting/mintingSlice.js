import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const initialState = {
  file: null,
  price: null,
  name: null,
  collection: "Art",
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
    updateCollection(state, action) {
      state.collection = action.payload;
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
    postUploadCleanup(state, action) {
      state.file = null;
      state.price = null;
      state.name = null;
      state.collection = "Art";
      state.image = null;
      state.externalUrl = null;
      state.description = null;
    },
  },
});

export const mintingSliceActions = mintingSlice.actions;

export const uploadToImgurThunk = (data) => async (dispatch) => {
  const uploadToImgur = async () => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/upload/uploadimgur`, data)
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
  // console.log("mintnew");
  const mintNewNFT = async () => {
    return axios.post(
      `${process.env.REACT_APP_API_SERVER}/upload/newnftinfo`,
      newNftInfo
    );
  };
  try {
    mintNewNFT();
    // console.log("done hello");
    // let imageUrl = await uploadToImgur();
    // dispatch(mintingSliceActions.updateImage(imageUrl));
  } catch (err) {
    console.log("add nft info fail", err);
  }
};

export default mintingSlice;
