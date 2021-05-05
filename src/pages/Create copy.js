import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const Create = () => {
	const [image, setImage] = useState(null);

	const fileSelectedHandler = (e) => {
		setImage(e.target.files[0]);
	};

	const fileUpload = async (e) => {
		e.preventDefault();
		// console.log("i have small dice", image);
		const uploadImg = await document.getElementById("uploadImg").files[0];
		let data = new FormData();
		data.append("image", image);
		// console.log(data);
		// console.log(Array.from(data));
		// const uploadImgur = async () => {
		// 	console.log("hello");
		return axios.post(`http://localhost:8000/upload/uploadimgur/`, {
			test: image,
		});
		// };
		// try {
		// 	let res = await uploadImgur();
		// 	console.log(res);
		// } catch (err) {
		// 	console.log("get transaction fail", err);
		// }
	};
	// e.preventDefault();
	// const uploadImg = document.getElementById("uploadImg").files[0];
	// console.log("dllmch", uploadImg);
	// const formdata = new FormData();

	// formdata.append("image", uploadImg);
	// console.log(process.env.REACT_APP_CID);
	// console.log(formdata);
	// axios
	// 	.post("https://api.imgur.com/3/image/", {
	// 		headers: {
	// 			Authorization: `Client-ID ${process.env.REACT_APP_CID}`,
	// 		},
	// 		body: formdata,
	// 	})
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
		</div>
	);
};

export default Create;
