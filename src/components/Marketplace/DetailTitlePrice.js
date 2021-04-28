import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./DetailTitlePrice.module.css";
import DetailBuyModal from "./DetailBuyModal";

function DetailTitlePrice(props) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [itemName, setitemName] = useState("");

  return (
    <>
      <p className={classes.category}>{props.itemdata.category}</p>
      <p className={classes.title}>{props.itemdata.title}</p>
      <p>Owned by "NAME"</p>
      <div className={classes.pricediv}>
        <p>Current Price</p>
        <p className={classes.title}>ETH {props.itemdata.price}</p>
        <Button variant="primary" onClick={() => setShowBuyModal(true)}>
          Buy Now (LAUNCH MODAL)
        </Button>
        <DetailBuyModal
          show={showBuyModal}
          onHide={() => setShowBuyModal(false)}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(itemName);
            props.mint(itemName);
            setitemName("");
          }}
        >
          <div className="form-group">
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setitemName(e.target.value)}
              className="form-control form-control-md"
              placeholder="Item Name"
              required
            />
          </div>
          <Button type="submit" className="m-3" variant="success">
            Mint
          </Button>
        </form>

        <Button className="m-3" variant="success">
          Transfer to
        </Button>
        <Button className="m-3" variant="success">
          Approve
        </Button>
        <Button className="m-3" variant="success">
          Cancel Approve
        </Button>
        <Button className="m-3" variant="success">
          Burn Token
        </Button>
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
