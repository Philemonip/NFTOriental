import { Accordion, Card, Col } from "react-bootstrap";
import classes from "./BrowseSidebar.module.css";
import BrowseSidebarStatus from "./BrowseSidebarStatus";

//TODO: MAY NEED REFACTOR INTO ACCORDION COMPONENT

function BrowseSidebar() {
  return (
    <Col lg="auto" className={classes.sidebarcolumn}>
      <div className={classes.sidebar}>
        <Accordion defaultActiveKey="0">
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Status
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <BrowseSidebarStatus />
                {/* It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout */}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey="0">
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Collections
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <Accordion defaultActiveKey="0">
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Price Range
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>Some price range here</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </Col>
  );
}
export default BrowseSidebar;
