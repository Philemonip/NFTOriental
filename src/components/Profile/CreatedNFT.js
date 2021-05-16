import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import classes from "./CollectiblesGrid.module.css";
import { useState } from "react";
import ListSaleModal from "./ListSaleModal";
// import { LinkContainer } from "react-router-bootstrap";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";
import CollectiblesGridCard from "./CollectiblesGridCard";

const CreatedNFT = ({ itemNotForSale, itemOnSale, burnToken }) => {
  const { currentUser, items, listModal } = useSelector(
    (state) => state.detail
  );
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  let createdArr;

  const creatorItems = (items, currentUser) => {
    createdArr = items.filter((i) => i.creator === currentUser);
    // console.log("this creator created", createdArr);
  };
  creatorItems(items, currentUser);

  const modalHandler = (id) => {
    setCurrentId(id);
    dispatch(detailSliceActions.updateListModal(true));
  };

  return (
    <Container fluid className={classes.browseitem}>
      <Row className={classes.row}>
        {createdArr.length > 0 ? (
          createdArr.map((item, index) => {
            return (
              // <Col className="mt-4 d-flex justify-content-center" key={index}>
              //   <BrowseItemCard item={item} />
              // </Col>
              <div className={classes.grid}>
                <CollectiblesGridCard
                  modalHandler={modalHandler}
                  itemNotForSale={itemNotForSale}
                  burnToken={burnToken}
                  item={item}
                  key={index}
                />
              </div>
            );
          })
        ) : (
          <div className={classes.divWidth}>
            <div className={classes.noMatch}>
              <h4 className={`p-5 text-dark ${classes.notice}`}>
                You haven't created any items
              </h4>
            </div>
          </div>
        )}
      </Row>
      <ListSaleModal
        show={listModal}
        itemOnSale={itemOnSale}
        dialogClassName="modal-20w"
        tokenId={currentId}
      />
    </Container>
  );
};

export default CreatedNFT;
