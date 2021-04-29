import React from "react";
import { Spinner } from "react-bootstrap";
import "./loading.css";

const Loading = () => {
	return (
		<div className="loader d-flex justify-content-center align-items-center">
			<Spinner
				className="loadingSpinner"
				animation="border"
				variant="primary"
			/>
			<h1>im loading</h1>
		</div>
	);
};

export default Loading;
