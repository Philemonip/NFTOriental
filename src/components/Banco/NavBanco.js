import logo from "../../asset/hedge.png";
import { useSelector } from "react-redux";

const NavBanco = () => {
	const windowWidth = useSelector((state) => state.banco.windowWidth);
	return (
		<div className="container-fluid bancoNav">
			<div className="row">
				<div className="col-1 d-flex justify-content-right ">
					<div className="logo">
						<div class="scene">
							<div class="cube">
								<div class="cube__face cube__face--front"></div>
								<div class="cube__face cube__face--back"></div>
								<div class="cube__face cube__face--right"></div>
								<div class="cube__face cube__face--left"></div>
								<div class="cube__face cube__face--top"></div>
								<div class="cube__face cube__face--bottom"></div>
							</div>
						</div>
					</div>
					{/* <img src={logo} className="logo" alt="logo" /> */}
				</div>
				<div className="col d-flex align-items-center text-left">
					<div className="bancoTitle">
						{windowWidth >= 614 ? (
							<h1>banco de cinco chicos</h1>
						) : (
							<h1>BdeCC</h1>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBanco;

// <div className="logo">
// 	<h1>hello</h1>
// </div>;
