import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const initialState = { statusfilter: [], collectionfilter: [] };
const browseSlice = createSlice({
  name: "browse",
  initialState: initialState,
  reducers: {
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
    deleteStatusFilter(state, action) {
      state.statusfilter = state.statusfilter.filter(
        (link) => link !== action.payload
      );
    },
    deleteCollectionFilter(state, action) {
      state.collectionfilter = state.collectionfilter.filter(
        (link) => link !== action.payload
      );
    },
    clearFilter(state) {
      state.statusfilter = [];
      state.collectionfilter = [];
    },
  },
});

export const browseActions = browseSlice.actions;
export default browseSlice;

// export const getTransactionThunk = (address) => async (dispatch) => {
//   console.log("getlinkthunk");
//   const getTransactionRequest = async () => {
//     return await axios.get(`http://localhost:8000/transaction/${address}`);
//   };
//   try {
//     let res = await getTransactionRequest();
//     dispatch(bancoSliceActions.getTransaction(res.data));
//   } catch (err) {
//     console.log("get transaction fail", err);
//   }
// };
