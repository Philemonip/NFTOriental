import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import DetailBuyModal from "./DetailBuyModal";

function DetailTitlePrice() {
  const [showBuyModal, setShowBuyModal] = useState(false);

  return (
    <>
      <p>CATAGORY NAME</p>
      <p>PRODUCT NAME</p>
      <p>Owned by "NAME"</p>
      <div className={classes.pricediv}>
        <p>Current Price</p>
        <p>PRICE</p>
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
