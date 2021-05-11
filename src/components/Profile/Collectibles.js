import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import classes from "./CollectiblesGrid.module.css";
import React, { useState } from "react";
import ListSaleModal from "./ListSaleModal";
import { LinkContainer } from "react-router-bootstrap";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";
import CollectiblesGridCard from "./CollectiblesGridCard";

const Collectibles = (props) => {
  const { currentUser, items, listModal } = useSelector(
    (state) => state.detail
  );
  const [currentID, setcurrentID] = useState(0);
  const dispatch = useDispatch();

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
    setcurrentID(id);
    dispatch(detailSliceActions.updateListModal(true));
  };

  return (
    <div className="d-flex Collectibles">
      {ownedArr &&
        ownedArr.map((item, index) => {
          return (
            <div className={classes.grid} key={index}>
              <CollectiblesGridCard item={item} />
            </div>
            // <Card key={index} style={{ width: "18rem" }} className="mx-2">
            //   <Card.Img
            //     variant="top"
            //     src={imgSource(item.id)}
            //     alt={item.id}
            //     roundedCircle
            //   />
            //   <Card.Body>
            //     <LinkContainer to={`/items/asset/${item.id}`}>
            //       <button className="text-center">{item.itemName}</button>
            //     </LinkContainer>

            //     <Card.Text>
            //       <p className="m-1">
            //         Owner:{" "}
            //         <a href={`/profile/${item.owner}`}>
            //           {item.owner.substr(0, 16)}...
            //         </a>
            //       </p>
            //       <p className="m-1">
            //         Creator:{" "}
            //         <a href={`/profile/${item.creator}`}>
            //           {item.creator.substr(0, 16)}...
            //         </a>
            //       </p>
            //       <p className="m-1">Id: {item.id}</p>
            //       <p className="m-1">Price {item.price / 1e18}</p>
            //       {item.forSale === true ? (
            //         <p className="m-1">Listing </p>
            //       ) : (
            //         <p className="m-1">Not Listing </p>
            //       )}
            //     </Card.Text>

            //     <div className="d-flex">
            //       {item.forSale === true ? (
            //         <button
            //           className="mx-1"
            //           onClick={(e) => props.itemNotForSale(item.id)}
            //         >
            //           Cancel Listing
            //         </button>
            //       ) : (
            //         <button
            //           className="mx-1"
            //           onClick={() => modalHandler(item.id)}
            //         >
            //           List Item
            //         </button>
            //       )}
            //       {/* <Button variant="success">Approve</Button>
            //                     <Button variant="warning">Cancel Approve</Button> */}
            //       {item.owner === item.creator && (
            //         <div>
            //           <button
            //             className="mx-1"
            //             onClick={(e) => props.burnToken(item.id)}
            //           >
            //             Burn Token
            //           </button>
            //         </div>
            //       )}
            //     </div>
            //   </Card.Body>
            // </Card>
          );
        })}
      {ownedArr && (
        <ListSaleModal
          show={listModal}
          // onHide={() => setListItemModal(false)}
          itemOnSale={props.itemOnSale}
          dialogClassName="modal-20w"
          tokenId={currentID}
        />
      )}
    </div>
  );
};

export default Collectibles;
