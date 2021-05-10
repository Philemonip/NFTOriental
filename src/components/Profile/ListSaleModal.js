import { Modal, Form } from "react-bootstrap";
import { useState } from "react";
import LoadModal from "../Common/LoadModal";
import { useSelector, useDispatch } from "react-redux";
import { detailSliceActions } from "../../redux/Marketplace/detailSlice";

function ListSaleModal(props) {
  let tokenId = props.tokenId;
  const [price, setprice] = useState("");
  //   const [listLoad, setListLoad] = useState(false);
  const etherscanLoad = useSelector((state) => state.detail.etherscanLoad);
  //   const listModal = useSelector((state) => state.detail.listModal);
  const dispatch = useDispatch();

  const handleList = async () => {
    // await dispatch(detailSliceActions.updateEtherscanLoad(false));
    // await dispatch(detailSliceActions.updateListLoad(true));
    // await props.itemOnSale(tokenId, price);
    // await dispatch(detailSliceActions.updateListLoad(false));

    await dispatch(detailSliceActions.updateListModal(false));
    await dispatch(detailSliceActions.updateEtherscanLoad(true));
    await props.itemOnSale(tokenId, price);
    await dispatch(detailSliceActions.updateEtherscanLoad(false));
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            List Sale
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Set Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price (CCH)"
                onChange={(e) => setprice(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                <p>{tokenId}</p>
                {/* We'll never share your email with anyone else. */}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="mx-1" onClick={handleList}>
            List on Sale
          </button>
          <button
            onClick={() => dispatch(detailSliceActions.updateListLoad(false))}
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
