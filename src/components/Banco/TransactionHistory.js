import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
const TransactionHistory = () => {
	const transaction = useSelector((state) => state.banco.transaction);
	const showTransactionHistory = useSelector(
		(state) => state.banco.showTransactionHistory
	);
	const dispatch = useDispatch();
	return showTransactionHistory ? (
		<div>
			<button
				className="btn"
				onClick={() => dispatch(bancoSliceActions.toggleTransactionHistory())}
			>
				Hide Transaction History
			</button>
			<h3 className="text-center">transaction history</h3>
			<div className="row mr-auto ml-auto">
				<div className="col-lg-6 d-flex justify-content-center align-items-center">
					<p>Accounts</p>
				</div>
				<div className="col d-flex justify-content-center align-items-center">
					<p>Amount</p>
				</div>
				<div className="col d-flex justify-content-center align-items-center ">
					<p>Category</p>
				</div>
			</div>
			<hr style={{ backgroundColor: "white" }}></hr>
			{transaction.map((t, key) => (
				<div key={key} className="row">
					<div className="col-lg-6 justify-contents-center ">
						<div className="fromAddress">
							{t.from_address == "Banco" ? (
								<p>From: {t.from_address}</p>
							) : (
								<p>From: {t.from_address}</p>
								// <p>{t.from_address.substr(0, 9)}...</p>
							)}
						</div>
						<div className="toAddress">
							<p>To: {t.to_address}</p>
							{/* <p>{t.to_address.substr(0, 9)}...</p> */}
						</div>
					</div>
					<div className="col d-flex justify-content-center align-items-center">
						<p>
							{t.amount / 1e18}
							{t.currency}
						</p>
					</div>
					<div className="col d-flex justify-content-center align-items-center">
						<p>{t.category}</p>
					</div>
				</div>
			))}
		</div>
	) : (
		<button
			className="btn"
			onClick={() => dispatch(bancoSliceActions.toggleTransactionHistory())}
		>
			Show Transaction History
		</button>
	);
};

export default TransactionHistory;
