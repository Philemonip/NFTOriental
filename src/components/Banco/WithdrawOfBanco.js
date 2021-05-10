import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'


const WithdrawOfBanco = ({ withdraw }) => {
	return (
		<div className="BancoWithdraw p-4">
			<br></br>
			<h2 className="pt-1">Withdraw your ETH</h2>
			<br></br>
			<h4>together with</h4>
			<br></br>
			<h3>CCH Interest</h3> <FontAwesomeIcon icon={faWallet} size="2x" />
			<br></br>
			<br></br>
			<div>
				<button
					type="submit"
					className="btn btn-warning px-4"
					onClick={(e) => withdraw(e)}
				>
					WITHDRAW
				</button>
			</div>
		</div>
	);
};

export default WithdrawOfBanco;
