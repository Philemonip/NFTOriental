import logo from "../../asset/hedge.png";
const NavBanco = () => {
	return (
		<div className="container-fluid bancoNav">
			<div className="row">
				<div className="col-lg-1 d-flex justify-content-right ">
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
					<h1>banco de cinco chicos</h1>
				</div>
			</div>
		</div>
	);
};

export default NavBanco;

// <div className="logo">
// 	<h1>hello</h1>
// </div>;
