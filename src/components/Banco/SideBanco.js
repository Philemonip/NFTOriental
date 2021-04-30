import { useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
const SideBanco = () => {
	const dispatch = useDispatch();
	return (
		<div className="col-md-2 bancoSide text-left">
			<div className="col ">
				<button
					className="btn"
					onClick={() => dispatch(bancoSliceActions.changeBancoContent("Home"))}
				>
					Home
				</button>
			</div>
			<div className="col">
				<button
					className="btn"
					onClick={() =>
						dispatch(bancoSliceActions.changeBancoContent("Profile"))
					}
				>
					Profile
				</button>
			</div>
			<div className="col">
				<button
					className="btn"
					onClick={() =>
						dispatch(bancoSliceActions.changeBancoContent("Action"))
					}
				>
					Action
				</button>
			</div>
			<div className="col">
				<button className="btn">Closesea</button>
			</div>
		</div>
	);
};

export default SideBanco;
