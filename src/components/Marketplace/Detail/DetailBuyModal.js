import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classes from "./DetailBuyModal.module.css";
import { useDispatch } from "react-redux";
import { detailSliceActions } from "../../../redux/Marketplace/detailSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function DetailBuyModal(props) {
  // const cchBalance = useSelector((state) => state.banco.cchBalance);

  const dispatch = useDispatch();
  let tokenId = props.token_id;

  const handleBuy = () => {
    dispatch(detailSliceActions.updateBuyModal(false));
    props.buyWithoutApprovalToken(tokenId, props.itemdata.current_price);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName={classes.modalDialog}
      centered
      animation={true}
      onHide={() => {
        dispatch(detailSliceActions.updateBuyModal(false));
      }}
    >
      <Modal.Header className={classes.modalheader}>
        <button
          className="btn btn-light"
          onClick={() => {
            dispatch(detailSliceActions.updateBuyModal(false));
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </Modal.Header>
      <Modal.Body className={classes.modalbody}>
        <Row className="mb-3 d-flex justify-content-center align-items-center">
          <h4>
            <b>Checkout</b>
          </h4>
        </Row>
        <Row className={classes.subtotalrow}>
          <Col lg={9}>
            <h5>Item</h5>
          </Col>
          <Col>
            <h5>Subtotal</h5>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={9}>
            <Row>
              <Col lg={4} className={classes.imgdiv}>
                <Image
                  className={classes.image}
                  src={props.itemdata.image}
                  fluid
                />
              </Col>
              <Col className="d-flex align-items-center">
                <div>
                  <p className="text-primary">{props.itemdata.collection}</p>
                  <h5>{props.itemdata.name}</h5>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <h5>{props.itemdata.current_price} CCH</h5>
          </Col>
        </Row>
        <Row className={classes.totalrow}>
          <Col className="d-flex align-items-end">
            <h5>Total</h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <h5>{props.itemdata.current_price} CCH</h5>
          </Col>
        </Row>
        <Row className="d-flex mt-5 justify-content-center">
          <Button className={classes.button} onClick={handleBuy}>
            <b>Checkout</b>
          </Button>
          <LinkContainer to="/cincochicos">
            <Button
              className={`${classes.button} ml-4`}
              onClick={() => {
                dispatch(detailSliceActions.updateBuyModal(false));
              }}
            >
              <b>Add Funds</b>
            </Button>
          </LinkContainer>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default DetailBuyModal;
