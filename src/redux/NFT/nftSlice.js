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
    return await axios.get(`http://localhost:8000/profile`, { params: { address } });
  };
  try {
    let res = await getTransactionRequest();
    console.log(res, 'res')
    dispatch(nftSliceActions.getTransaction(res.data));
    console.log("DATA", res.data);
  } catch (err) {
    console.log("get transaction fail", err);
  }
};

export const addNFTtransactionThunk = (newTransactionData) => async (dispatch) => {
  console.log("add Transaction Thunk", newTransactionData);
  const addNFTtransactionRequest = async () => {
    return await axios.post(
      `http://localhost:8000/items/undefined`,
      newTransactionData
    );
  };
  try {
    await addNFTtransactionRequest();
    // dispatch(bancoSliceActions.addTransaction(newTransactionData));
  } catch (err) {
    console.log("add new transaction fail", err);
  }
};

export const addmetadataThunk = (newMetaData) => async (dispatch) => {
  console.log("new metadata", newMetaData);
  const addMetaData = async () => {
    return await axios.post(
      `http://localhost:8000/profile`,
      newMetaData,
    );
  };
  try {
    await addMetaData();
  } catch (err) {
    console.log("add new metadata fail", err)
  }
};

export const updateItemThunk = (updateData) => async (dispatch) => {
  console.log("changing item status")
  const updateItem = async () => {
    return await axios.put(
      `http://localhost:8000/profile`,
      updateData,
    )
  }
  try {
    await updateItem();
  } catch (err) {
    console.log("update item fail", err)
  }
}

export const deleteItemThunk = (deleteData) => async (dispatch) => {
  console.log("deleting item")
  const deleteItem = async () => {
    return await axios.delete(
      `http://localhost:8000/profile`,
      { data: deleteData },
    )
  }
  try {
    await deleteItem();
  } catch (err) {
    console.log("delete item fail", err)
  }
}


export default nftSlice;
