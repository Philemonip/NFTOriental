import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import DetailBuyModal from "./DetailBuyModal";
import { useSelector, useDispatch } from "react-redux";
import ListSaleModal from "../../Profile/ListSaleModal";
import { detailSliceActions } from "../../../redux/Marketplace/detailSlice";

function DetailTitlePrice({
  itemdata,
  buyWithoutApprovalToken,
  token_id,
  loginStatus,
  itemNotForSale,
  itemOnSale,
}) {
  const [itemDetailLoaded, setItemDetailLoaded] = useState(0);
  // const currentUser = useSelector((state) => state.detail.currentUser);
  // const itemOwner = useSelector((state) => state.detail.owner);
  // const listModal = useSelector((state) => state.detail.listModal);
  // const items = useSelector((state) => state.detail.items);
  const { currentUser, listModal, buyModal, items } = useSelector(
    (state) => state.detail
  );
  // const [showListItemModal, setListItemModal] = useState(false);
  const dispatch = useDispatch();
  let itemDetail;

  const item = async (items, tokenId) => {
    itemDetail = await items.filter(
      (i) => i.id === tokenId && i.itemName === itemdata.name
    );
    console.log("this is the item", itemDetail[0]);
    setItemDetailLoaded(itemDetail[0]);
  };
  item(items, token_id);

  console.log(itemdata);

  return (
    <>
      <p className={classes.collection}>{itemdata.collection}</p>
      <p className={classes.title}>{itemdata.name}</p>
      {itemDetailLoaded && (
        <LinkContainer to={`/profile/${itemDetailLoaded.owner}`}>
          <button className="btn">Owned by {itemDetailLoaded.owner}</button>
        </LinkContainer>
      )}

      <div className={classes.pricediv}>
        <p>Current Price</p>
        {itemDetailLoaded && (
          <p className={classes.title}>CCH {itemDetailLoaded.price / 1e18}</p>
        )}

        {loginStatus === true ? (
          <div>
            {itemDetailLoaded &&
            currentUser &&
            currentUser === itemDetailLoaded.owner ? (
              <div>
                {itemDetailLoaded.forSale === false ? (
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch(detailSliceActions.updateListModal(true))
                    }
                  >
                    List Item
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => itemNotForSale(token_id)}
                  >
                    Cancel Listing
                  </Button>
                )}
                <ListSaleModal
                  show={listModal}
                  // setListItemModal={setListItemModal}
                  itemOnSale={itemOnSale}
                  dialogClassName="modal-20w"
                  tokenId={token_id}
                />
              </div>
            ) : (
              <div>
                {itemdata.on_sale === true ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      dispatch(detailSliceActions.updateBuyModal(true));
                    }}
                  >
                    Buy Now
                  </Button>
                ) : (
                  <p>This item is not for sale.</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Please Login Metamask to see price/purchase</p>
          </div>
        )}

        {/* <p>{itemOwner}</p>
        <p>{currentUser}</p>
        <p>{token_id}</p> */}

        <DetailBuyModal
          itemdata={itemdata}
          show={buyModal}
          buyWithoutApprovalToken={buyWithoutApprovalToken}
          token_id={token_id}
          // onHide={() => setShowBuyModal(false)}
        />
      </div>
    </>
  );
}

export default DetailTitlePrice;

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
