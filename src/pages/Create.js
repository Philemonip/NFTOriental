import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Create = () => {
	const [file, setFile] = useState(null);

	const fileSelectedHandler = (e) => {
		setFile(e.target.files[0]);
	};

	const fileUpload = async (e) => {
		e.preventDefault();
		const data = new FormData();
		console.log(process.env.REACT_APP_CID);
		console.log(data);
		data.append("file", file);
		return axios
			.post("http://localhost:8000/upload/uploadimgur", data)
			.then((data) => console.log(data))
			.catch((err) => {
				console.log("ok", err);
			});
		// const url = document.getElementById("url");
		// const img = document.getElementById("img");
		// img.src = data.data.link;
		// url.innerText = data.data.link;

		// axios
		// 	.post(
		// 		"https://api.imgur.com/3/image/",
		// 		{ body: data },
		// 		{
		// 			headers: {
		// 				"Content-type": "application/x-www-form-urlencoded",
		// 				Authorization: `Client-ID ${process.env.REACT_APP_CID}`,
		// 			},
		// 		}
		// 	)
		// 	.then((data) => data.json())
		// 	.then((data) => {
		// 		const url = document.getElementById("url");
		// 		const img = document.getElementById("img");
		// 		img.src = data.data.link;
		// 		url.innerText = data.data.link;
		// 	})
		// 	.catch((err) => {
		// 		console.log("ok", err);
		// 	});
	};

	return (
		<div>
			<form
				id="confirm-form"
				encType="multipart/form-data"
				onSubmit={fileUpload}
			>
				<input
					name="uploadImg"
					type="file"
					id="uploadImg"
					onChange={fileSelectedHandler}
					required
				/>

				<button type="submit" className="btn btn-primary" value="upload">
					Confirm
				</button>
			</form>
			<p id="url"></p>
			<img src="" alt="hion9" id="img" />
		</div>
	);
};

export default Create;
