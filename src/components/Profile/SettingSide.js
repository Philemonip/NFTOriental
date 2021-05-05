import React from "react";

const SettingSide = ({ setContent }) => {
	return (
		<div>
			<div>
				<button
					onClick={() => {
						setContent("General");
					}}
				>
					General Settings
				</button>
			</div>

			<div>
				<button
					onClick={() => {
						setContent("Hi");
					}}
				>
					Our Team
				</button>
			</div>
			<div>
				<button
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
