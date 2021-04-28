import { Container, Row } from "react-bootstrap";
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
          <BrowseSidebar />
          <BrowseItem />
        </Row>
      </Container>
    </>
  );
}

export default MarketBrowse;
