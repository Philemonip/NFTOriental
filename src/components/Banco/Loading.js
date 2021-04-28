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
			<Spinner
				className="loadingSpinner"
				animation="border"
				variant="secondary"
			/>
			<Spinner
				className="loadingSpinner"
				animation="border"
				variant="success"
			/>
			<Spinner className="loadingSpinner" animation="border" variant="danger" />
			<Spinner
				className="loadingSpinner"
				animation="border"
				variant="warning"
			/>
			<Spinner className="loadingSpinner" animation="border" variant="info" />
			<Spinner className="loadingSpinner" animation="border" variant="light" />
			<Spinner className="loadingSpinner" animation="border" variant="dark" />
			<h1>im loading</h1>
		</div>
	);
};

export default Loading;
