import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
require("dotenv").config();

const initialState = {
  // web3: "undefined",
  fromAddress: "",
  toAddress: "",
  price: "",
  transaction: [],
  loading: true,
  error: false,
  loadingTransaction: true,
  showTransactionHistory: false,
  windowWidth: window.innerWidth,
  sideDisplay: null,
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    getTransaction(state, action) {
      state.transaction = [...action.payload];
    },
    // addTransaction(state, action) {
    // 	// state.transaction.push(action.payload);
    // 	state.transaction = [...state.transaction, action.payload];
    // },
    resizeWindowWidth(state, action) {
      state.windowWidth = action.payload;
    },
    sideDisplay(state, action) {
      state.sideDisplay = action.payload;
    },
  },
});

export const nftSliceActions = nftSlice.actions;

export const getTransactionThunk = (address) => async (dispatch) => {
  console.log(address);
  console.log("GET TRANSACTION thunk");
  const getTransactionRequest = async () => {
    return await axios.get(`http://localhost:8000/profile/${address}`);
  };
  try {
    let res = await getTransactionRequest();
    dispatch(nftSliceActions.getTransaction(res.data));
    console.log("DATA", res.data);
  } catch (err) {
    console.log("get transaction fail", err);
  }
};

export const addTransactionThunk = (newTransactionData) => async (dispatch) => {
  console.log("add Transaction Thunk", newTransactionData);
  const addTransactionRequest = async () => {
    return await axios.post(
      `http://localhost:8000/profile`,
      newTransactionData
    );
  };
  try {
    await addTransactionRequest();
    // dispatch(bancoSliceActions.addTransaction(newTransactionData));
  } catch (err) {
    console.log("add new transaction fail", err);
  }
};

export const addItemVariableThunk = (item) => async (dispatch) => {
  console.log("add Item Variable Think", item);
  const addItemVariableRequest = async () => {
    return await axios.post(`http://localhost:8000/api/:tokenId`, item);
  };
  try {
    await addItemVariableRequest();
    // dispatch(bancoSliceActions.addTransaction(newTransactionData));
  } catch (err) {
    console.log("add new item variable fail", err);
  }
};

export default nftSlice;
