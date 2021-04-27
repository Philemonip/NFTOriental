import { Accordion, Card, Image } from "react-bootstrap";
// import classes from "./DetailImgInfo.module.css";

function DetailImgInfo() {
  const dummypic = `https://lh3.googleusercontent.com/pBZykzbkTOOygSF2ym8PKHU5o45p8VWIvmc1wLG2m7wGOJRz8NAH6LEiwRBpLY6IyUBX5aqQkz7rwvEadw3_2y3HDPm9wHSLqa3DGZE=s0`;

  //   className={classes.card}
  return (
    <>
      <div>
        <Image fluid src={dummypic} />
      </div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Details
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>Created by LightGod </p>
              <p>
                This is a useable artist asset. Use this to create your own art.
                Ultraviolet sculpture pained on glass and photographed.
              </p>
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
              <p>Contract Address: xxxxx</p>
              <p>Token ID: xxxxx</p>
              <p>Blockchain: Ethereum</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default DetailImgInfo;
