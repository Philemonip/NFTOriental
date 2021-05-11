import classes from "./DetailImgInfo.module.css";
import { Accordion, Card, Image } from "react-bootstrap";
// import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import classes from "./DetailImgInfo.module.css";

function DetailImgInfo({ itemdata, loginStatus, NFTaddress }) {
  console.log(NFTaddress);
  // const token = useSelector((state) => state.detail.token);
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
              <LinkContainer to={`/profile/${itemdata.creator}`}>
                <button className="btn">Created by {itemdata.creator}</button>
              </LinkContainer>
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
          {loginStatus === true ? (
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Contract Address: {NFTaddress}</p>
                <p>Token ID: {itemdata.token_id}</p>
                <p>Blockchain: Rinkeby</p>
              </Card.Body>
            </Accordion.Collapse>
          ) : (
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Please Login Metamask to see chain info</p>
              </Card.Body>
            </Accordion.Collapse>
          )}
        </Card>
      </Accordion>
    </>
  );
}

export default DetailImgInfo;
