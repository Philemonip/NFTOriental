import React from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
const SettingGeneral = () => {
	const [desireName, setDesireName] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("edit", desireName);
		//set to database
		//need current crypto address
		setDesireName("");
	};
	return (
		<Container>
			<Form className="m-3" onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Edit Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="desire username"
						value={desireName}
						onChange={(e) => setDesireName(e.target.value)}
						required
					/>
					<Form.Text className="text-muted">
						* This name will be shown on your avatar for chatroom
					</Form.Text>
				</Form.Group>

				<Form.Group className="d-flex justify-content-end">
					<Button type="submit">Save</Button>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default SettingGeneral;
