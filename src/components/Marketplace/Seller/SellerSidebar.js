import { Accordion, Card, Col } from "react-bootstrap";
import classes from "./SellerSidebar.module.css";
import SidebarCollection from "../../Common/Sidebar/SidebarCollection";
import SidebarSort from "../../Common/Sidebar/SidebarSort";
import SidebarStatus from "../../Common/Sidebar/SidebarStatus";

function BrowseSidebar() {
  const accordionArr = [
    {
      name: "Status",
      component: <SidebarStatus isSeller={true} />,
    },
    { name: "Sort by", component: <SidebarSort isSeller={true} /> },
    { name: "Collections", component: <SidebarCollection isSeller={true} /> },
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
