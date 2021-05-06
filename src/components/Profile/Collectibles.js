import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import ListSaleModal from "./ListSaleModal";

const Collectibles = (props) => {
	const currentUser = useSelector((state) => state.detail.currentUser);
	const items = useSelector((state) => state.detail.items);
	const [showListItemModal, setListItemModal] = useState(false);
	const [currentID, setcurrentID] = useState(0)

	let ownedArr;
	let imgsrc;

	const ownerItems = (items, currentUser) => {
		ownedArr = items.filter((i) => i.owner === currentUser);
		console.log("this owner owns", ownedArr);
	};
	ownerItems(items, currentUser);

	const imgSource = (id) => {
		let imgsrcArr = props.itemArr.filter((i) => i.token_id == id);
		if (imgsrcArr.length > 0) {
			imgsrc = imgsrcArr[0].image;
			return imgsrc;
		} else {
			return;
		}
	};

	const modalHandler = (id) => {
		setListItemModal(true);
		setcurrentID(id);
	}


	return (
		<div className="d-flex Collectibles">
			{ownedArr &&
				ownedArr.map((item, index) => {
					return (
						<Card key={index} style={{ width: "18rem" }} className="mx-2">
							<Card.Img
								variant="top"
								src={imgSource(item.id)}
								alt={item.id}
								roundedCircle
							/>
							<Card.Body>
								<Card.Title className="text-center">{item.itemName}</Card.Title>
								<Card.Text>
									<p className="m-1">
										Owner: <a href="/">{item.owner.substr(0, 16)}...</a>
									</p>
									<p className="m-1">
										Creator: <a href="/">{item.creator.substr(0, 16)}...</a>
									</p>
									<p className="m-1">Id: {item.id}</p>
									<p className="m-1">Price {item.price}</p>
								</Card.Text>

								<div className="d-flex">
									{item.forSale === true ? (
										<button
											className="mx-1"
											onClick={(e) => props.itemNotForSale(item.id)}
										>
											Not for Sale
										</button>
									) : (
										<button
											className="mx-1"
											onClick={() => modalHandler(item.id)}
										>
											List Item
										</button>
									)}
									{/* <Button variant="success">Approve</Button>
                                <Button variant="warning">Cancel Approve</Button> */}
									{item.owner === item.creator ? (
										<div>
											<button
												className="mx-1"
												onClick={(e) => props.burnToken(item.id)}
											>
												Burn Token
											</button>
										</div>
									) : (
										<div></div>
									)}
								</div>
							</Card.Body>
						</Card>
					);
				})}
			{ownedArr &&
				< ListSaleModal
					show={showListItemModal}
					onHide={() => setListItemModal(false)}
					itemOnSale={props.itemOnSale}
					dialogClassName="modal-20w"
					tokenId={currentID}
				/>
			}
		</div >
	);
};

export default Collectibles;
