import { Accordion, Card, Col } from "react-bootstrap";
import classes from "./BrowseSidebar.module.css";
import SidebarCollection from "../../Common/Sidebar/SidebarCollection";
import SidebarSort from "../../Common/Sidebar/SidebarSort";
import SidebarStatus from "../../Common/Sidebar/SidebarStatus";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import { HiOutlineCollection } from "react-icons/hi";

function BrowseSidebar() {
  const accordionArr = [
    {
      name: "Status",
      component: <SidebarStatus isSeller={false} />,
    },
    { name: "Sort by", component: <SidebarSort isSeller={false} /> },
    { name: "Collections", component: <SidebarCollection isSeller={false} /> },
  ];

  return (
    <Col lg="auto" className={classes.sidebarcolumn}>
      <div className={classes.sidebar}>
        {accordionArr.map((i, key) => (
          <Accordion defaultActiveKey="0" key={key}>
            <Card className={classes.card}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                {/* <HiOutlineCollection /> */}
                {i.icon}
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
