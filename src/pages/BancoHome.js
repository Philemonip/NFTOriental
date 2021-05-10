import Banco from "../abi/banco.json";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Token from "../abi/Token.json";
import Web3 from "web3";
import {
	bancoSliceActions,
	getTransactionThunk,
	addTransactionThunk,
} from "../redux/Banco/bancoSlice";
import ActionOfBanco from "../components/Banco/ActionOfBanco";
import Loading from "../components/Banco/Loading";
import "./BancoHome.css";
// import Navi from "../components/Common/Navbar";
import ProfileOfBanco from "../components/Banco/ProfileOfBanco";
import NavBanco from "../components/Banco/NavBanco";
import SideBanco from "../components/Banco/SideBanco";
import ContentOfBanco from "../components/Banco/ContentOfBanco";
var web3;
var token;
var banco;

const BancoHome = () => {
	const { account, loading, bancoContent } = useSelector(
		(state) => state.banco
	);
	const dispatch = useDispatch();
	useEffect(() => {
		const loadBlockchainData = async () => {
			dispatch(bancoSliceActions.toggleLoading(true));
			console.log("hi");
			if (typeof window.ethereum !== "undefined") {
				web3 = new Web3(window.ethereum);
				const netId = await web3.eth.net.getId();
				const accounts = await web3.eth.getAccounts();
				// dispatch(bancoSliceActions.updateWeb3(web3));
				//load balance
				if (typeof accounts[0] !== "undefined") {
					const ethBalanceInWei = await web3.eth.getBalance(accounts[0]);
					dispatch(bancoSliceActions.updateAccount(accounts[0]));
					console.log("testing, ", account);
					// setEthBalance(web3.utils.fromWei(ethBalanceInWei));
					dispatch(
						bancoSliceActions.updateEthBalance(
							web3.utils.fromWei(ethBalanceInWei)
						)
					);
				} else {
					dispatch(bancoSliceActions.toggleLoading(false));
					window.alert("Please login with MetaMask");
				}

				//load contracts
				try {
					token = new web3.eth.Contract(
						Token.abi,
						Token.networks[netId].address
					);
					banco = new web3.eth.Contract(
						Banco.abi,
						Banco.networks[netId].address
					);
					// dispatch(bancoSliceActions.updateToken(token));
					// dispatch(bancoSliceActions.updateBanco(banco));
					const cchBalanceInWei = await token.methods
						.balanceOf(accounts[0])
						.call();
					dispatch(
						bancoSliceActions.updateCchBalance(
							web3.utils.fromWei(`${cchBalanceInWei}`)
						)
					);
					dispatch(bancoSliceActions.toggleLoading(false));
					dispatch(getTransactionThunk(accounts[0]));
					dispatch(bancoSliceActions.toggleTransactionLoading(false));
				} catch (e) {
					console.log("Error", e);
					dispatch(bancoSliceActions.toggleLoading(false));
					window.alert("Contracts not deployed to the current network");
				}
			} else {
				dispatch(bancoSliceActions.toggleLoading(false));
				window.alert("Please install MetaMask");
			}
		};
		loadBlockchainData();
	}, [dispatch, account]);

	useEffect(() => {
		function handleResize() {
			dispatch(bancoSliceActions.resizeWindowWidth(window.innerWidth));
			window.innerWidth >= 1200
				? dispatch(bancoSliceActions.sideDisplay(true))
				: dispatch(bancoSliceActions.sideDisplay(false));
		}
		window.addEventListener("resize", handleResize);
	}, [dispatch]);

	// useEffect(() => {
	// 	console.log("useeffect", transaction);
	// }, [transaction]);

	async function deposit(amount) {
		if (banco !== "undefined") {
			try {
				await banco.methods
					.deposit()
					.send({ value: amount.toString(), from: account });
				await showBalance();
				// dispatch(bancoSliceActions.toggleDeposit());
			} catch (e) {
				console.log("Error, deposit: ", e);
			}
		}
	}
	async function withdraw(e) {
		e.preventDefault();
		if (banco !== "undefined") {
			try {
				//get ac, cch from bkend before
				const cchBalanceInWeiBefore = await token.methods
					.balanceOf(account)
					.call();
				await banco.methods.withdraw().send({ from: account });
				await showBalance();
				const cchBalanceInWeiAfter = await token.methods
					.balanceOf(account)
					.call();
				const amount = cchBalanceInWeiAfter - cchBalanceInWeiBefore;
				await console.log("amount", amount);
				//after -before = diff to bkend
				await dispatch(
					addTransactionThunk({
						fromAddress: "Banco",
						toAddress: account,
						amount: `${amount}`,
						category: "interest",
						currency: "CCH",
					})
				);
				// dispatch(bancoSliceActions.toggleDeposit());
				dispatch(bancoSliceActions.toggleTransactionLoading(true));
				await dispatch(getTransactionThunk(account));
				dispatch(bancoSliceActions.toggleTransactionLoading(false));
			} catch (e) {
				console.log("Error, withdraw: ", e);
				dispatch(bancoSliceActions.toggleTransactionLoading());
			}
		}
	}
	async function showBalance() {
		// setEthBalanceInWei(ethBalanceInWei);
		// setEthBalance(web3.utils.fromWei(ethBalanceInWei));
		const ethBalanceInWei = await web3.eth.getBalance(account);
		dispatch(
			bancoSliceActions.updateEthBalance(web3.utils.fromWei(ethBalanceInWei))
		);
		const cchBalanceInWei = await token.methods.balanceOf(account).call();
		dispatch(
			bancoSliceActions.updateCchBalance(web3.utils.fromWei(cchBalanceInWei))
		);
	}

	const transferCCH = async (targetAccount, amount) => {
		//current cch balance/ac from to to bkend
		const cchBalanceInWeiBefore = await token.methods.balanceOf(account).call();
		if (cchBalanceInWeiBefore > amount) {
			await token.methods
				.transfer(targetAccount, `${amount}`)
				.send({ from: account });
			await dispatch(
				addTransactionThunk({
					fromAddress: account,
					toAddress: targetAccount,
					amount: `${amount}`,
					category: "Transfer",
					currency: "CCH",
				})
			);
			dispatch(bancoSliceActions.toggleTransactionLoading(true));
			await dispatch(getTransactionThunk(account));
			dispatch(bancoSliceActions.toggleTransactionLoading(false));
			await showBalance();
			//current cch balance/ac ac from to to bkend cat = transfer
		}
	};

	return (
		<div>
			{/* <Navi /> */}
			<div className="cchHome">
				{loading ? (
					<Loading />
				) : (
					<div className="BancoLanding">
						<div className="container-fluid text-center">
							<NavBanco />
							<div className="row bancoMain">
								<SideBanco />
								<div className="col-xl-11">
									<div className="row">
										{bancoContent === "Home" ? (
											<ContentOfBanco />
										) : bancoContent === "Profile" ? (
											<ProfileOfBanco />
										) : (
											<ActionOfBanco
												deposit={deposit}
												withdraw={withdraw}
												transferCCH={transferCCH}
											/>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default BancoHome;
