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
					general setting
				</button>
			</div>

			<div>
				<button
					onClick={() => {
						setContent("Hi");
					}}
				>
					Hi
				</button>
			</div>
		</div>
	);
};

export default SettingSide;
