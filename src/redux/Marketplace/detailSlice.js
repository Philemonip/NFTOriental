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

//Thunks Here
// 1. dispatch: update status/collec. state
// 2. process query string and submit getReq
// 3. dispatch: update output with res.data
// export const browseToggleThunk = (type, data, isSeller) => async (
//   dispatch,
//   getState
// ) => {
//   // console.log(isSeller, "isSeller");
//   // console.log("status thunk");
//   // console.log(type, data);
//   try {
//     switch (type) {
//       case "init":
//         console.log("Init Data browseslice");
//         break;
//       case "sort":
//         await dispatch(browseActions.sortOption(data));
//         break;
//       case "status":
//         await dispatch(browseActions.toggleStatusFilter(data));
//         break;
//       case "collection":
//         await dispatch(browseActions.toggleCollectionFilter(data));
//         break;
//       case "softclear":
//         await dispatch(browseActions.softClear());
//         break;
//       case "hardclear":
//         await dispatch(browseActions.hardClear());
//         break;
//       default:
//         console.error(`Error: Switch Case not found`);
//     }
//     let state = getState();
//     // console.log("browseslice");
//     // console.log(state.browse.statusfilter);
//     // console.log(state.browse.collectionfilter);
//     let res = await axios.post(`${process.env.REACT_APP_API_SERVER}/items/`, {
//       status: state.browse.statusfilter,
//       collection: state.browse.collectionfilter,
//       sortoption: state.browse.sortOption,
//       isSeller: isSeller,
//       sellerAddress: state.browse.sellerAddress,
//     });
//     dispatch(browseActions.getFiltered(res.data));
//   } catch (err) {
//     console.log("Get Filtered Item Failed", err);
//   }
// };

export const detailSliceActions = detailSlice.actions;

export default detailSlice;
