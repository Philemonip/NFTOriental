import { Accordion, Card, Table } from "react-bootstrap";
import classes from "./DetailTradingHistory.module.css";

function DetailTradingHistory({ itemdata }) {
  //   className={classes.card}
  console.log(itemdata);
  let transactionDateArr = [];

  if (itemdata[1]) {
    transactionDateArr = itemdata[1].map((i) => ({
      ...i,
      createdDate: new Date(i.created_at).toLocaleDateString("en-US"),
      createdTime: new Date(i.created_at).toLocaleTimeString("en-US"),
    }));
    console.log(transactionDateArr);
  }
  return (
    <>
      <Accordion defaultActiveKey="0" className={classes.accordion}>
        <Card className={classes.card}>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Trading History
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>From Address</th>
                    <th>To Address</th>
                    <th>Price (CCH)</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionDateArr.length > 0 ? (
                    transactionDateArr.map((item, key) => (
                      <tr key={key}>
                        <td>
                          {item.createdDate} {item.createdTime}
                        </td>
                        <td>{item.from_address}</td>
                        <td>{item.to_address}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))
                  ) : (
                    <p>No Trading History</p>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}

export default DetailTradingHistory;
