import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  web3: "undefined",
  currentUser: "",
  contract: null,
  items: [],
  token: [],
  owner: "",
  listModal: false,
  buyModal: false,
  etherscanLoad: false,
  cchHash: null,
  nftHash: null,
  ethHash: null,
  // ownerAlias: "",
  // creatorAlias: "",
};

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    updateWeb3(state, action) {
      state.web3 = action.payload;
    },
    updateCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    updateContract(state, action) {
      state.contract = action.payload;
    },
    updateItem(state, action) {
      state.items = action.payload;
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
    updateOwner(state, action) {
      state.owner = action.payload;
    },
    updateEtherscanLoad(state, action) {
      state.etherscanLoad = action.payload;
    },
    updateListModal(state, action) {
      state.listModal = action.payload;
    },
    updateBuyModal(state, action) {
      state.buyModal = action.payload;
    },
    updateCchHash(state, action) {
      state.cchHash = action.payload;
    },
    updateNftHash(state, action) {
      state.nftHash = action.payload;
    },
    updateEthHash(state, action) {
      state.ethHash = action.payload;
    },
    // getOwnerAlias(state, action) {
    //   state.ownerAlias = action.payload;
    // },
    // getCreatorAlias(state, action) {
    //   state.creatorAlias = action.payload;
    // },
  },
});

export const detailSliceActions = detailSlice.actions;

export default detailSlice;
