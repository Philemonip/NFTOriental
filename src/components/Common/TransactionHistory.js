import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
const TransactionHistory = () => {
	const transaction = useSelector((state) => state.banco.transaction);
	const dispatch = useDispatch();
	const showTransactionHistory = useSelector(
		(state) => state.banco.showTransactionHistory
	);
	return showTransactionHistory ? (
		<div>
			<button
				className="btn btn-primary"
				onClick={() => dispatch(bancoSliceActions.toggleTransactionHistory())}
			>
				Hide Transaction History
			</button>

			<div className="row mr-auto ml-auto">
				<div className="col d-flex justify-contents-center">
					<p>From</p>
				</div>
				<div className="col d-flex justify-contents-center">
					<p>To</p>
				</div>
				<div className="col d-flex justify-contents-center">
					<p>Amount</p>
				</div>
				<div className="col d-flex justify-contents-center">
					<p>Category</p>
				</div>
			</div>
			<hr style={{ backgroundColor: "white" }}></hr>
			{transaction.map((t, key) => (
				<div key={key} className="row">
					<div className="col d-flex justify-contents-center">
						{t.from_address == "Banco" ? (
							<p>{t.from_address}</p>
						) : (
							<p>{t.from_address.substr(0, 9)}...</p>
						)}
					</div>
					<div className="col d-flex justify-contents-center">
						<p>{t.to_address.substr(0, 9)}...</p>
					</div>
					<div className="col d-flex justify-contents-center">
						<p>
							{t.amount / 1e18}
							{t.currency}
						</p>
					</div>
					<div className="col d-flex justify-contents-center">
						<p>{t.category}</p>
					</div>
				</div>
			))}
		</div>
	) : (
		<button
			className="btn btn-primary"
			onClick={() => dispatch(bancoSliceActions.toggleTransactionHistory())}
		>
			Show Transaction History
		</button>
	);
};

export default TransactionHistory;
