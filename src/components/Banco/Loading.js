import React from "react";
import { Spinner } from "react-bootstrap";
import "./loading.css";

const Loading = () => {
	return (
		<div className="loader d-flex justify-content-center align-items-center">
			<Spinner
				className="loadingSpinner"
				animation="border"
				variant="dark"
			/>
			<h1 className="p-3">Loading</h1>
		</div>
	);
};

export default Loading;
