import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

import React from "react";

const LoadModal = ({ show, setShow }) => {
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<Modal show={show} backdrop="static" keyboard={false}>
				<Modal.Header>
					<Modal.Title>Milting</Modal.Title>
				</Modal.Header>
				<Modal.Body>Please continue on Metamask to mint</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Understood
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default LoadModal;
