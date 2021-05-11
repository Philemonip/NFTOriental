import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./CollectiblesGrid.module.css";
import React, { useState } from "react";
import ListSaleModal from "./ListSaleModal";
import { LinkContainer } from "react-router-bootstrap";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";
import CollectiblesGridCard from "./CollectiblesGridCard";

const CreatedNFT = (props) => {
  const { currentUser, items, listModal } = useSelector(
    (state) => state.detail
  );
  const [currentID, setcurrentID] = useState(0);
  const dispatch = useDispatch();
  let imgsrc;
  let createdArr;

  const creatorItems = (items, currentUser) => {
    createdArr = items.filter((i) => i.creator === currentUser);
    console.log("this creator created", createdArr);
  };
  creatorItems(items, currentUser);

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
    <Container fluid className={classes.browseitem}>
      <Row className={classes.row}>
        {createdArr &&
          createdArr.map((item, index) => {
            return (
              // <Col className="mt-4 d-flex justify-content-center" key={index}>
              //   <BrowseItemCard item={item} />
              // </Col>
              <div className={classes.grid}>
                <CollectiblesGridCard
                  modalHandler={modalHandler}
                  itemNotForSale={props.itemNotForSale}
                  itemOnSale={props.itemOnSale}
                  burnToken={props.burnToken}
                  listModal={props.listModal}
                  imgSource={imgSource}
                  item={item}
                  key={index}
                />
              </div>
            );
          })}
      </Row>
    </Container>
  );
};

export default CreatedNFT;
