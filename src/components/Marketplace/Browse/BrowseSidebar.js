import { Accordion, Card, Col } from "react-bootstrap";
import classes from "./BrowseSidebar.module.css";
import BrowseSidebarCollection from "./BrowseSidebarCollection";
import BrowseSidebarStatus from "./BrowseSidebarStatus";

//TODO: MAY NEED REFACTOR INTO ACCORDION COMPONENT

function BrowseSidebar() {
  const accordionArr = [
    {
      name: "Status",
      component: <BrowseSidebarStatus />,
    },
    { name: "Collections", component: <BrowseSidebarCollection /> },
  ];

  return (
    <Col lg="auto" className={classes.sidebarcolumn}>
      <div className={classes.sidebar}>
        {accordionArr.map((i, key) => (
          <Accordion defaultActiveKey="0" key={key}>
            <Card className={classes.card}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                {i.name}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{i.component}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </div>
    </Col>
  );
}
export default BrowseSidebar;
