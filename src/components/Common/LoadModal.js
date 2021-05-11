import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

import React from "react";

const LoadModal = ({ show, title }) => {
  const { cchHash, nftHash, ethHash } = useSelector((state) => state.detail);

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please continue on Metamask</Modal.Body>
        {cchHash != null && (
          <Modal.Body>
            CCH transaction in progress, usually takes up to 30 secounds. You
            may check the status
            <a
              href={`https://rinkeby.etherscan.io/tx/${cchHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              here
            </a>
          </Modal.Body>
        )}
        {nftHash != null && (
          <Modal.Body>
            NFT transaction in progress, usually takes up to 30 secounds. You
            may check the status
            <a
              href={`https://rinkeby.etherscan.io/tx/${nftHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              here
            </a>
          </Modal.Body>
        )}
        {ethHash != null && (
          <Modal.Body>
            ETH transaction in progress, usually takes up to 30 secounds. You
            may check the status
            <a
              href={`https://rinkeby.etherscan.io/tx/${ethHash}`}
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              here
            </a>
          </Modal.Body>
        )}
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default LoadModal;
