import { Accordion, Card } from "react-bootstrap";
import classes from "./DetailTradingHistory.module.css";

function DetailTradingHistory() {
  //   className={classes.card}
  return (
    <>
      <Accordion defaultActiveKey="0" className={classes.accordion}>
        <Card className={classes.card}>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Trading History
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>MAYBE PUT A TABLE HERE</p>
              <p>MAYBE PUT A TABLE HERE</p>
              <p>MAYBE PUT A TABLE HERE</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default DetailTradingHistory;
