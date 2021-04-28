import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
const TransferCCHOfBanco = ({ transferCCH }) => {
	const targetAccount = useSelector((state) => state.banco.targetAccount);
	const transferAmount = useSelector((state) => state.banco.transferAmount);
	const dispatch = useDispatch();
	return (
		<div>
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
								dispatch(bancoSliceActions.updateTargetAccount(e.target.value))
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
								dispatch(bancoSliceActions.updateTransferAmount(e.target.value))
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
		</div>
	);
};

export default TransferCCHOfBanco;
