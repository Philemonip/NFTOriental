import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

import React from "react";

const LoadModal = ({ show, title }) => {
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please continue on Metamask</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={handleClose}>
            Understood
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadModal;
