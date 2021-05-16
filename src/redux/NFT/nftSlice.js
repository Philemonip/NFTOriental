import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const initialState = {
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
  name: null,
};

const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    getTransaction(state, action) {
      state.transaction = [...action.payload];
    },
    getName(state, action) {
      state.name = action.payload;
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
  // console.log("GET TRANSACTION thunk");
  const getTransactionRequest = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API_SERVER}/nfttransaction/profile`,
      {
        params: { address },
      }
    );
  };
  try {
    let res = await getTransactionRequest();
    dispatch(nftSliceActions.getTransaction(res.data));
    // console.log("DATA", res.data);
  } catch (err) {
    console.log("get transaction fail", err);
  }
};

export const addNFTtransactionThunk = (newTransactionData) => async (
  dispatch
) => {
  // console.log("add Transaction Thunk", newTransactionData);
  const addNFTtransactionRequest = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_SERVER}/nfttransaction/items`,
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
  // console.log("new metadata", newMetaData);
  const addMetaData = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_SERVER}/profile`,
      newMetaData
    );
  };
  try {
    await addMetaData();
  } catch (err) {
    console.log("add new metadata fail", err);
  }
};

export const updateItemThunk = (updateData) => async (dispatch) => {
  // console.log("changing item status");
  const updateItem = async () => {
    return await axios.put(
      `${process.env.REACT_APP_API_SERVER}/profile`,
      updateData
    );
  };
  try {
    await updateItem();
  } catch (err) {
    console.log("update item fail", err);
  }
};

export const deleteItemThunk = (deleteData) => async (dispatch) => {
  // console.log("deleting item");
  const deleteItem = async () => {
    return await axios.delete(`${process.env.REACT_APP_API_SERVER}/profile`, {
      data: deleteData,
    });
  };
  try {
    await deleteItem();
  } catch (err) {
    console.log("delete item fail", err);
  }
};

export const addNameThunk = (name) => async (dispatch) => {
  // console.log("updating name");
  const addName = async () => {
    return await axios.post(
      `${process.env.REACT_APP_API_SERVER}/displayname`,
      name
    );
  };
  try {
    let res = await addName();
    // console.log(res);
    dispatch(nftSliceActions.getName(res.data));
  } catch (err) {
    console.log("change name fail", err);
  }
};

export const getNameThunk = (address) => async (dispatch) => {
  // console.log("getting name");
  // console.log(address);
  const getName = async () => {
    return await axios.get(`${process.env.REACT_APP_API_SERVER}/displayname`, {
      params: { address },
    });
  };
  try {
    let res = await getName();
    dispatch(nftSliceActions.getName(res.data[0].alias));
  } catch (err) {
    console.log("get name fail", err);
  }
};

export default nftSlice;
