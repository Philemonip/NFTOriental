// import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import DetailBuyModal from "./DetailBuyModal";
import { useSelector, useDispatch } from "react-redux";

function DetailTitlePrice({
  itemdata,
  buyWithoutApprovalToken,
  token_id,
  loginStatus,
}) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const currentUser = useSelector((state) => state.detail.currentUser);
  const itemOwner = useSelector((state) => state.detail.owner);
  const token = useSelector((state) => state.detail.token);
  // const token = useSelector((state) => state.detail.token);
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
          <Button variant="primary" onClick={() => setShowBuyModal(true)}>
            Buy Now
          </Button>
        ) : (
          <div>
            <p>Please Login Metamask to see price/purchase</p>
          </div>
        )}

        {currentUser && currentUser === itemOwner ?

          <div>
            {itemOwner.forSale == false ?
              <Button variant="danger" onClick={() => setShowBuyModal(true)}>
                List Item
</Button>
              :
              <Button variant="danger" onClick={() => setShowBuyModal(true)}>
                Cancel Listing
</Button>
            }
          </div>
          : <div>
            <Button variant="primary" onClick={() => setShowBuyModal(true)}>
              Buy Now
  </Button>
          </div>
        }


        {/* <p>{props.getOwner(props.token_id)}</p> */}
        <p>{itemOwner}</p>
        <p>{currentUser}</p>
        <p>{token_id}</p>
        <p>{token.forSale}</p>


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
