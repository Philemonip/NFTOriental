import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const initialState = { itemArr: [], statusfilter: [], collectionfilter: [] };
const browseSlice = createSlice({
  name: "browse",
  initialState: initialState,
  reducers: {
    getFiltered(state, action) {
      state.itemArr.push(...action.payload);
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
    clearFilter(state) {
      state.statusfilter = [];
      state.collectionfilter = [];
    },
  },
});

//Thunks Here
// 1. dispatch: update status/collec. state
// 2. process query string and submit getReq
// 3. dispatch: update output with res.data
//TODO: itemArr is not connected to actual page, which still use useeffect
export const browseToggleThunk = (type, data) => async (dispatch, getState) => {
  // console.log("status thunk");
  // console.log(type, data);

  try {
    switch (type) {
      case "status":
        await dispatch(browseActions.toggleStatusFilter(data));
        break;
      case "collection":
        await dispatch(browseActions.toggleCollectionFilter(data));
        break;
      default:
        console.error(`Error: Switch Case not found`);
    }
    let state = getState();
    console.log("getstate");
    console.log(state.browse.statusfilter);
    console.log(state.browse.collectionfilter);
    //FIXME: enable me when connected to real data
    // let res = await axios.post(`${process.env.REACT_APP_API_SERVER}`, {
    //   status: state.browse.statusfilter,
    //   collection: state.browse.collectionfilter,
    // });
    // dispatch(browseActions.getFiltered(res.data));
  } catch (err) {
    console.log("Get Filtered Item Failed", err);
  }
};

export const browseActions = browseSlice.actions;
export default browseSlice;
