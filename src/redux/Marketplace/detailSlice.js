import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    web3: "undefined",
    owner: "",
    contract: null,
    items: [],
};

const detailSlice = createSlice({
    name: "detail",
    initialState,
    reducers: {
        updateWeb3(state, action) {
            state.web3 = action.payload;
        },
        updateOwner(state, action) {
            state.owner = action.payload;
        },
        updateContract(state, action) {
            state.contract = action.payload;
        },
        // updateEthBalance(state, action) {
        //     state.ethBalance = action.payload;
        // },
        // updateCchBalance(state, action) {
        //     state.cchBalance = action.payload;
        // },
        updateItem(state, action) {
            state.items = action.payload;
        }
    }
});

export const detailSliceActions = detailSlice.actions;

export default detailSlice;



