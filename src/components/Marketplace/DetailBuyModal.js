import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import classes from "./DetailBuyModal.module.css";

function DetailBuyModal(props) {
  const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName={classes.modalDialog}
      centered
      animation={false}
    >
      <Modal.Header closeButton className={classes.modalheader}></Modal.Header>
      <Modal.Body className={classes.modalbody}>
        <Row className="mb-3 d-flex justify-content-center align-items-center">
          <h4>Checkout</h4>
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
              <Col lg={4}>
                <Image className={classes.image} src={dummypic} fluid />
              </Col>
              <Col className="d-flex align-items-center">
                <div>
                  <p>ITEM CAT.</p>
                  <h5>ITEM NAME</h5>
                </div>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <h5>ETH 0.01</h5>
          </Col>
        </Row>
        <Row className={classes.totalrow}>
          <Col className="d-flex align-items-end">
            <h5>Total</h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <h5>DER PRICE</h5>
          </Col>
        </Row>
        <Row className="d-flex mt-2 justify-content-center">
          <Button onClick={(e) => props.buyWithoutApprovalToken(0)}> Checkout</Button>
          <Button className="ml-3">Add Funds</Button>
        </Row>
        <Row>
          <h5 className="text-danger">Bigger Buttons</h5>
        </Row>
      </Modal.Body >
    </Modal >
  );
}

export default DetailBuyModal;
