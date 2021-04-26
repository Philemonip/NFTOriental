import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import DetailImgInfo from "../components/Marketplace/DetailImgInfo";
import DetailTitlePrice from "../components/Marketplace/DetailTitlePrice";
import DetailTradingHistory from "../components/Marketplace/DetailTradingHistory";
import "../App.css";

function MarketDetail() {
  const params = useParams();

  return (
    <div className="App">
      <Navi />
      <Container fluid>
        {params.itemAddress && (
          <p>You are in ItemDetail, address: {params.itemAddress}</p>
        )}
        <Row>
          <Col>
            <DetailImgInfo />
          </Col>
          <Col>
            <DetailTitlePrice />
          </Col>
        </Row>
        <Row>
          <DetailTradingHistory />
        </Row>
      </Container>
    </div>
  );
}

export default MarketDetail;
