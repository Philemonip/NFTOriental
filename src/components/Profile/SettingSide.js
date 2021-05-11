import React from "react";

const SettingSide = ({ setContent }) => {
	return (
		<div>
			<div>
				<button className="btn font-weight-bold text-left"
					onClick={() => {
						setContent("General");
					}}
				>
					General Settings
				</button>
			</div>

			<div>
				<button className="btn font-weight-bold text-left"
					onClick={() => {
						setContent("Hi");
					}}
				>
					Development Team
				</button>
			</div>
			<div>
				<button className="btn font-weight-bold text-left"
					onClick={() => {
						setContent("Join Us");
					}}
				>
					Join Us
				</button>
			</div>
		</div>
	);
};

export default SettingSide;
