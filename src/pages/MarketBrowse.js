import { Container, Row, Col } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import BrowseItem from "../components/Marketplace/BrowseItem";
import BrowseSidebar from "../components/Marketplace/BrowseSidebar";
import "../App.css";

function MarketBrowse() {
  return (
    <>
      <Navi />
      <Container fluid>
        <Row>
          {/* <Col lg="auto" className="px-0 "> */}
          <BrowseSidebar />
          {/* </Col> */}
          <Col className="px-0">
            <BrowseItem />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MarketBrowse;
