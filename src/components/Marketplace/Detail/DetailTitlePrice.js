// import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import DetailBuyModal from "./DetailBuyModal";
import { useSelector } from "react-redux";
import ListSaleModal from "../../Profile/ListSaleModal";

function DetailTitlePrice({
  itemdata,
  buyWithoutApprovalToken,
  token_id,
  loginStatus,
  itemNotForSale,
  itemOnSale,
}) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const currentUser = useSelector((state) => state.detail.currentUser);
  const itemOwner = useSelector((state) => state.detail.owner);
  const token = useSelector((state) => state.detail.token);
  const items = useSelector((state) => state.detail.items);
  const [showListItemModal, setListItemModal] = useState(false);

  let itemDetail;

  const item = (items, tokenId) => {
    itemDetail = items.filter((i) => i.id === tokenId && i.itemName === itemdata.name);
    console.log("this is the item", itemDetail[0]);
  };
  item(items, token_id);

  console.log(itemdata)

  return (
    <>
      <p className={classes.collection}>{itemdata.collection}</p>
      <p className={classes.title}>{itemdata.name}</p>
      <LinkContainer to="/">
        <button className="btn">Owned by {itemdata.owner}</button>
      </LinkContainer>

      <div className={classes.pricediv}>
        <p>Current Price</p>
        <p className={classes.title}>ETH {itemdata.current_price}</p>
        {loginStatus == true ? (
          <div>
            { currentUser && currentUser === itemOwner ?
              <div>
                {itemDetail[0].forSale == false ?
                  <Button variant="danger" onClick={() => setListItemModal(true)}>
                    List Item
                  </Button>
                  :
                  <Button variant="danger" onClick={() => itemNotForSale(token_id)}>
                    Cancel Listing
                  </Button>
                }
                < ListSaleModal
                  show={showListItemModal}
                  onHide={() => setListItemModal(false)}
                  itemOnSale={itemOnSale}
                  dialogClassName="modal-20w"
                  tokenId={token_id}
                />
              </div>
              :
              <div>
                {itemdata.on_sale == true ?
                  <Button variant="primary" onClick={() => setShowBuyModal(true)}>
                    Buy Now
                  </Button>
                  :
                  <p>This item is not for sale.</p>
                }
              </div>
            }
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
          show={showBuyModal}
          buyWithoutApprovalToken={buyWithoutApprovalToken}
          token_id={token_id}
          onHide={() => setShowBuyModal(false)}
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
