import dotenv from "dotenv";
import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
dotenv.config();

const initialState = { itemsArr: [] };

const marketBrowseSlice = createSlice({
  name: "marketBrowse",
  initialState: initialState,
  reducers: {
    getItems(state, action) {
      state.itemsArr.push(...action.payload);
    },
  },
});

export const marketBrowseActions = marketBrowseSlice.actions;

export default marketBrowseSlice;
