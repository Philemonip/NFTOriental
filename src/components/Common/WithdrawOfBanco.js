import React from "react";
const WithdrawOfBanco = ({ withdraw }) => {
	return (
		<div>
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
		</div>
	);
};

export default WithdrawOfBanco;
