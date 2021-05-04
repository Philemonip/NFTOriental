import classes from "./DetailImgInfo.module.css";
import { Accordion, Card, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { useSelector, useDispatch } from "react-redux";
// import classes from "./DetailImgInfo.module.css";

function DetailImgInfo({ itemdata }) {
  const token = useSelector((state) => state.detail.token);
  // const dispatch = useDispatch();

  return (
    <>
      <div className={classes.imagediv}>
        <Image fluid src={itemdata.image} />
      </div>
      <Accordion defaultActiveKey="0" className="mt-4">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>Created by {itemdata.creator}</p>
              <p>{itemdata.description}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Chain Info
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>Contract Address: {token.owner}</p>
              <p>Token ID: {itemdata.token_id}</p>
              <p>Blockchain: Ethereum</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default DetailImgInfo;
