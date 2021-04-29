import { Accordion, Card, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import classes from "./DetailImgInfo.module.css";

function DetailImgInfo({ itemdata }) {
  // const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;

  const token = useSelector((state) => state.detail.token);
  // const dispatch = useDispatch();

  return (
    <>
      <div>
        <Image fluid src={itemdata.image} />
      </div>
      <Accordion defaultActiveKey="0" className="mt-4">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>Created by {token.creator}</p>
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
              <p>Contract Address: {token.creator}</p>
              <p>Token ID: {token.name}</p>
              <p>Blockchain: Ethereum</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default DetailImgInfo;
