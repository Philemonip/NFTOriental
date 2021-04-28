import { Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import BrowseItem from "../components/Marketplace/BrowseItem";
import BrowseSidebar from "../components/Marketplace/BrowseSidebar";

function MarketBrowse() {
  const style = {
    overflow: "hidden",
    height: "100vh",
  };

  return (
    <div style={style}>
      <Navi />
      <Container fluid>
        <Row>
          <BrowseSidebar />
          <BrowseItem />
        </Row>
      </Container>
    </div>
  );
}

export default MarketBrowse;
