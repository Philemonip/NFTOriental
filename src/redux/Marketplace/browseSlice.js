import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const initialState = {
  sortOption: "default",
  itemArr: [],
  statusfilter: [],
  collectionfilter: [],
  sellerAddress: "",
};

const browseSlice = createSlice({
  name: "browse",
  initialState: initialState,
  reducers: {
    getSellerAddress(state, action) {
      state.sellerAddress = action.payload;
    },

    getFiltered(state, action) {
      state.itemArr = [];
      state.itemArr.push(...action.payload);
    },

    sortOption(state, action) {
      state.sortOption = action.payload;
    },

    toggleStatusFilter(state, action) {
      let checkExist = state.statusfilter.indexOf(action.payload) > -1;
      if (!checkExist) {
        state.statusfilter.push(action.payload);
      } else {
        state.statusfilter = state.statusfilter.filter(
          (status) => status !== action.payload
        );
      }
    },

    toggleCollectionFilter(state, action) {
      let checkExist = state.collectionfilter.indexOf(action.payload) > -1;
      if (!checkExist) {
        state.collectionfilter.push(action.payload);
      } else {
        state.collectionfilter = state.collectionfilter.filter(
          (status) => status !== action.payload
        );
      }
    },

    softClear(state) {
      state.itemArr = [];
      state.statusfilter = [];
      state.collectionfilter = [];
    },

    hardClear(state) {
      state.itemArr = [];
      state.statusfilter = [];
      state.collectionfilter = [];
      state.sortOption = "default";
      state.sellerAddress = "";
    },
  },
});

//Thunks Here
// 1. dispatch: update status/collec. state
// 2. process query string and submit getReq
// 3. dispatch: update output with res.data
export const browseToggleThunk =
  (type, data, isSeller) => async (dispatch, getState) => {
    // console.log(isSeller, "isSeller");
    // console.log("status thunk");
    // console.log(type, data);
    try {
      switch (type) {
        // case "init":
        //   console.log("Init Data browseslice");
        // break;
        case "sort":
          await dispatch(browseActions.sortOption(data));
          break;
        case "status":
          await dispatch(browseActions.toggleStatusFilter(data));
          break;
        case "collection":
          await dispatch(browseActions.toggleCollectionFilter(data));
          break;
        case "softclear":
          await dispatch(browseActions.softClear());
          break;
        case "hardclear":
          await dispatch(browseActions.hardClear());
          break;
        default:
          console.error(`Error: Switch Case not found`);
      }
      let state = getState();
      // console.log("browseslice");
      // console.log(state.browse.statusfilter);
      // console.log(state.browse.collectionfilter);
      let res = await axios.post(`${process.env.REACT_APP_API_SERVER}/items/`, {
        status: state.browse.statusfilter,
        collection: state.browse.collectionfilter,
        sortoption: state.browse.sortOption,
        isSeller: isSeller,
        sellerAddress: state.browse.sellerAddress,
      });
      dispatch(browseActions.getFiltered(res.data));
    } catch (err) {
      console.log("Get Filtered Item Failed", err);
    }
  };

export const browseActions = browseSlice.actions;
export default browseSlice;
