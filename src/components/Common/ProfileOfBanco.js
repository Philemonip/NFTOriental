import { useSelector } from "react-redux";
const ProfileOfBanco = () => {
	const account = useSelector((state) => state.banco.account);
	const ethBalance = useSelector((state) => state.banco.ethBalance);
	const cchBalance = useSelector((state) => state.banco.cchBalance);
	return (
		<div className="col text-left hello">
			<h3>Logged in as : {account.substr(0, 9)}...</h3>
			<br></br>
			<h3>ETH balance: {ethBalance}</h3>
			<br></br>
			<h3>CCH balance: {cchBalance}</h3>
			<br></br>
		</div>
	);
};

export default ProfileOfBanco;
