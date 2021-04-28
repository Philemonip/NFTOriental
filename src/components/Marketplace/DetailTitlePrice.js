import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import DetailBuyModal from "./DetailBuyModal";

function DetailTitlePrice({ itemdata }) {
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <>
      <p className={classes.category}>{itemdata.category}</p>
      <p className={classes.title}>{itemdata.title}</p>
      <p>Owned by "NAME"</p>
      <div className={classes.pricediv}>
        <p>Current Price</p>
        <p className={classes.title}>ETH {itemdata.price}</p>
        <Button variant="primary" onClick={() => setShowBuyModal(true)}>
          Buy Now (LAUNCH MODAL)
        </Button>
        <DetailBuyModal
          show={showBuyModal}
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
