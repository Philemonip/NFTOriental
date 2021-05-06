import React from "react";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";
import { useSelector, useDispatch } from "react-redux";
import { addNameThunk, nftSliceActions } from "../../redux/NFT/nftSlice";

const SettingGeneral = () => {
	const currentUser = useSelector((state) => state.detail.currentUser);
	const [desireName, setDesireName] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("edit", desireName, currentUser);
		await dispatch(addNameThunk({
			alias: desireName,
			address: currentUser,
		}))
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
