import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	web3: "undefined",
	account: "",
	ethBalance: 0,
	cchBalance: 0,
	targetAccount: "",
	token: null,
	banco: null,
	depositAmount: 0,
	transferAmount: 0,
};

const bancoSlice = createSlice({
	name: "banco",
	initialState,
	reducers: {
		getItems(state, action) {
			state.itemsArr.push(...action.payload);
		},
		updateWeb3(state, action) {
			state.web3 = action.payload;
		},
		updateAccount(state, action) {
			state.account = action.payload;
		},
		updateEthBalance(state, action) {
			state.ethBalance = action.payload;
		},
		updateCchBalance(state, action) {
			state.cchBalance = action.payload;
		},
		updateTargetAccount(state, action) {
			state.targetAccount = action.payload;
		},
		updateBanco(state, action) {
			state.banco = action.payload;
		},
		updateToken(state, action) {
			state.token = action.payload;
		},
		updateDepositAmount(state, action) {
			state.depositAmount = action.payload;
		},
		updateTransferAmount(state, action) {
			state.transferAmount = action.payload;
		},
	},
});

export const bancoSliceActions = bancoSlice.actions;

export default bancoSlice;
