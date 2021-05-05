import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import dotenv from "dotenv";
import { Button, Container, Form } from "react-bootstrap";
import {
	mintingSliceActions,
	uploadToImgurThunk,
	mintNFTThunk,
} from "../../redux/Minting/mintingSlice";
dotenv.config();

const Mint = ({ handleMintingSubmit }) => {
	const {
		file,
		price,
		name,
		category,
		image,
		externalUrl,
		description,
	} = useSelector((state) => state.mint);
	const dispatch = useDispatch();
	// const fileSelectedHandler = (e) => {
	//      const url = document.getElementById("url");
	// 	const img = document.getElementById("img");
	// 	img.src = data.data.link;
	// 	url.innerText = data.data.link;
	// };
	// const uploadToImgur = async () => {

	// 	// return axios
	// 	// 	.post("http://localhost:8000/upload/uploadimgur", data)
	// 	// 	.then((data) => {
	// 	// 		dispatch(mintingSliceActions.updateImage(data.data));
	// 	// 	});
	// };

	// const handleMintingSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const data = new FormData();
	// 	data.append("file", file);
	// 	let imageUrl = await dispatch(uploadToImgurThunk(data));

	// 	const newNftInfo = {
	// 		name,
	// 		price,
	// 		category,
	// 		image: imageUrl,
	// 		externalUrl,
	// 		description,
	// 	};
	// 	await dispatch(mintNFTThunk(newNftInfo));
	// };

	return (
		<div>
			<Container>
				<Form
					className="m-3"
					id="confirm-form"
					encType="multipart/form-data"
					onSubmit={handleMintingSubmit}
				>
					<Form.Group>
						<Form.Label>Upload File</Form.Label>
						<Form.Control
							name="uploadImg"
							type="file"
							id="uploadImg"
							onChange={(e) =>
								dispatch(mintingSliceActions.updateFile(e.target.files[0]))
							}
							required
						/>
						<Form.Text className="text-muted">Upload a file</Form.Text>
					</Form.Group>
					{/* <Form.Group>
						<Form.Label>Price</Form.Label>
						<Form.Control
							name="price"
							type="number"
							id="price"
							value={price}
							placeholder="price"
							onChange={(e) =>
								dispatch(mintingSliceActions.updatePrice(e.target.value))
							}
							required
						/>
						<Form.Text className="text-muted">
							Service fee: $ {price * 0.05}, You will receive $ {price * 0.95}
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							name="name"
							type="text"
							id="name"
							value={name}
							placeholder="Name"
							onChange={(e) =>
								dispatch(mintingSliceActions.updateName(e.target.value))
							}
							required
						/>
						<Form.Text className="text-muted">Product Name</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Categoies</Form.Label>
						<Form.Control
							name="categoies"
							type="text"
							id="categoies"
							value={category}
							placeholder="Categoies"
							onChange={(e) =>
								dispatch(mintingSliceActions.updateCategory(e.target.value))
							}
							required
						/>
						<Form.Text className="text-muted">Categoies</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>External Url</Form.Label>
						<Form.Control
							name="externalUrl"
							type="text"
							id="externalUrl"
							value={externalUrl}
							placeholder="External Url"
							onChange={(e) =>
								dispatch(mintingSliceActions.updateExternalUrl(e.target.value))
							}
							required
						/>
						<Form.Text className="text-muted">External Url</Form.Text>
					</Form.Group>*/}
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							name="description"
							type="text"
							id="description"
							value={description}
							placeholder="Description"
							onChange={(e) =>
								dispatch(mintingSliceActions.updateDescription(e.target.value))
							}
							required
						/>
						<Form.Text className="text-muted">Description</Form.Text>
					</Form.Group>
					<Form.Group className="d-flex justify-content-center">
						<Button type="submit" className="btn btn-primary" value="upload">
							Confirm
						</Button>
					</Form.Group>
				</Form>
			</Container>
			<p id="url"></p>
			<img src="" alt="hion9" id="img" />
		</div>
	);
};

export default Mint;
