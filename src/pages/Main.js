import { Tabs, Tab } from "react-bootstrap";
import Banco from "../abi/banco.json";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Token from "../abi/Token.json";
import Web3 from "web3";
import { bancoSliceActions } from "../redux/Banco/bancoSlice";
// import {
// 	updateBanco,
// 	updateToken,
// 	updateWeb3,
// 	updateAccount,
// 	updateDepositAmount,
// 	updateEthBalance,
// 	updateCchBalance,
// 	updatTargetAccount,
// 	updateTransferAmount,
// } from "../redux";

const Main = () => {
	const web3 = useSelector((state) => state.banco.web3);
	const account = useSelector((state) => state.banco.account);
	const token = useSelector((state) => state.banco.token);
	const banco = useSelector((state) => state.banco.banco);
	const ethBalance = useSelector((state) => state.banco.ethBalance);
	const cchBalance = useSelector((state) => state.banco.cchBalance);
	const depositAmount = useSelector((state) => state.banco.depositAmount);
	const targetAccount = useSelector((state) => state.banco.targetAccount);
	const transferAmount = useSelector((state) => state.banco.transferAmount);

	const dispatch = useDispatch();
	useEffect(async () => {
		await loadBlockchainData();
		// await console.log("in use effect", token);
		// await console.log("in use effect", account);
		// await showBalance();
	}, []);
	// useEffect(async () => {
	// 	await showBalance();
	// }, []);

	// useEffect(() => {
	// 	async function fetchData() {
	// 		await loadBlockchainData();
	// 	}
	// 	fetchData();
	// }, []);
	const loadBlockchainData = async () => {
		console.log("hi");
		if (typeof window.ethereum !== "undefined") {
			const web3 = new Web3(window.ethereum);
			const netId = await web3.eth.net.getId();
			const accounts = await web3.eth.getAccounts();
			dispatch(bancoSliceActions.updateWeb3(web3));
			//load balance
			if (typeof accounts[0] !== "undefined") {
				const ethBalanceInWei = await web3.eth.getBalance(accounts[0]);
				// setAccount(accounts[0]);
				dispatch(bancoSliceActions.updateAccount(accounts[0]));
				console.log("testing, ", account);
				// setEthBalanceInWei(ethBalanceInWei);
				// setEthBalance(web3.utils.fromWei(ethBalanceInWei));
				dispatch(
					bancoSliceActions.updateEthBalance(
						web3.utils.fromWei(ethBalanceInWei)
					)
				);
			} else {
				window.alert("Please login with MetaMask");
			}

			// if (token) {
			// 	// setCchBalanceInWei(cchBalanceInWei);
			// 	// setCchBalance(web3.utils.fromWei(cchBalanceInWei));
			// 	const cchBalanceInWei = await token.methods.balanceOf(account).call();
			// 	dispatch(updateCchBalance(web3.utils.fromWei(cchBalanceInWei)));
			// }

			//load contracts
			try {
				const token = new web3.eth.Contract(
					Token.abi,
					Token.networks[netId].address
				);
				const banco = new web3.eth.Contract(
					Banco.abi,
					Banco.networks[netId].address
				);
				// const bancoAddress = Banco.networks[netId].address;
				// setToken(token);
				console.log("1, in load", token);
				dispatch(bancoSliceActions.updateToken(token));
				console.log("2 , after added", token);
				console.log("3 , after see account", accounts[0]);
				// setBanco(banco);
				dispatch(bancoSliceActions.updateBanco(banco));
				// setBancoAddress(bancoAddress);
				const cchBalanceInWei = await token.methods
					.balanceOf(accounts[0])
					.call();
				dispatch(
					bancoSliceActions.updateCchBalance(
						web3.utils.fromWei(`${cchBalanceInWei}`)
					)
				);
			} catch (e) {
				console.log("Error", e);
				window.alert("Contracts not deployed to the current network");
			}
		} else {
			window.alert("Please install MetaMask");
		}
	};

	const deposit = async (amount) => {
		if (banco !== "undefined") {
			try {
				await banco.methods
					.deposit()
					.send({ value: amount.toString(), from: account });
				await showBalance();
			} catch (e) {
				console.log("Error, deposit: ", e);
			}
		}
	};
	const withdraw = async (e) => {
		e.preventDefault();
		if (banco !== "undefined") {
			try {
				await banco.methods.withdraw().send({ from: account });
				await showBalance();
			} catch (e) {
				console.log("Error, withdraw: ", e);
			}
		}
	};
	const showBalance = async () => {
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
	};

	const transferCCH = async (targetAccount, amount) => {
		await token.methods
			.transfer(targetAccount, `${amount}`)
			.send({ from: account });
		await showBalance();
	};

	return (
		<div className="text-monospace">
			<div className="container-fluid mt-5 text-center">
				<br></br>
				<h1>bienvenido al banco de cinco chicos</h1>
				<h2>Logged in as : {account}</h2>
				{/* <button onClick={(e) => showBalance()}>update balance</button> */}
				<h2>ETH balance: {ethBalance}</h2>
				<h2>CCH balance: {cchBalance}</h2>
				<br></br>
				<div className="row">
					<main role="main" className="col-lg-12 d-flex text-center">
						<div className="content mr-auto ml-auto">
							<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
								<Tab eventKey="deposit" title="Deposit">
									<div>
										<br></br>
										How much do you want to deposit?
										<br></br>
										(min. amount is 0.01 ETH)
										<br></br>
										(1 deposit is possible at the time)
										<br></br>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												let amount = depositAmount;
												amount = amount * 10 ** 18; //convert to wei
												deposit(amount);
											}}
										>
											<div className="form-group mr-sm-2">
												<br></br>
												<input
													id="depositAmount"
													step="0.01"
													type="number"
													value={depositAmount}
													onChange={(e) =>
														dispatch(
															bancoSliceActions.updateDepositAmount(
																e.target.value
															)
														)
													}
													className="form-control form-control-md"
													placeholder="amount..."
													required
												/>
											</div>
											<button type="submit" className="btn btn-primary">
												DEPOSIT
											</button>
										</form>
									</div>
								</Tab>
								<Tab eventKey="withdraw" title="Withdraw">
									<br></br>
									Do you want to withdraw + take interest?
									<br></br>
									<br></br>
									<div>
										<button
											type="submit"
											className="btn btn-primary"
											onClick={(e) => withdraw(e)}
										>
											WITHDRAW
										</button>
									</div>
								</Tab>
								<Tab eventKey="transferCCH" title="Transfer CCH">
									<br></br>
									Transfer CCH to other address
									<br></br>
									<br></br>
									<div>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												let amount = transferAmount;
												amount = amount * 10 ** 18; //convert to wei
												transferCCH(targetAccount, amount);
											}}
										>
											<div className="form-group mr-sm-2">
												<br></br>
												<input
													id="targetAddress"
													type="text"
													value={targetAccount}
													onChange={(e) =>
														dispatch(
															bancoSliceActions.updateTargetAccount(
																e.target.value
															)
														)
													}
													className="form-control form-control-md"
													placeholder="target account..."
													required
												/>
											</div>
											<div className="form-group mr-sm-2">
												<br></br>
												<input
													id="transferAmount"
													step="0.01"
													type="number"
													value={transferAmount}
													onChange={(e) =>
														dispatch(
															bancoSliceActions.updateTransferAmount(
																e.target.value
															)
														)
													}
													className="form-control form-control-md"
													placeholder="amount..."
													required
												/>
											</div>
											<button type="submit" className="btn btn-primary">
												Trasnfer
											</button>
										</form>
									</div>
								</Tab>
							</Tabs>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default Main;
