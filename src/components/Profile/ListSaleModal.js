import { Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

function ListSaleModal(props) {
  let tokenId = props.tokenId;
  const [price, setprice] = useState("");
  const dispatch = useDispatch();

  const handleList = async () => {
    await dispatch(detailSliceActions.updateListModal(false));
    await props.itemOnSale(tokenId, price);
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-warning pb-1">
          <Modal.Title id="contained-modal-title-vcenter">
            <h3 className="listing">
              {" "}
              <FontAwesomeIcon icon={faTags} /> List NFT On Sale
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <h5>Set Price</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price (CCH)"
                onChange={(e) => setprice(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                {/* We'll never share your email with anyone else. */}
                <h5 className="mt-3">Token ID: {tokenId}</h5>
                <h5 className="text-right">{price} CCH</h5>
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="mx-1 btn btn-light" onClick={handleList}>
            List on Sale
          </button>
          <button
            className="mx-1 btn btn-light"
            onClick={() => dispatch(detailSliceActions.updateListModal(false))}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
      {/* <LoadModal show={etherscanLoad} /> */}
    </>
  );
}

export default ListSaleModal;
