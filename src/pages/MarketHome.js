import Navi from "../components/Common/Navbar";
import HomeNewlyMinted from "../components/Marketplace/HomeNewlyMinted";
import classes from "./MarketHome.module.css";
import "../App.css";
import HomeFeatureCard from "../components/Marketplace/HomeFeatureCard";
import { Container, Row, Col } from "react-bootstrap";

function MarketHome() {
  return (
    <>
      <Navi />
      {/* <Trending Collection /> */}
      {/* <Maybe a Carousel for collection/> */}

      <div className={classes.markethome}>
        <Container fluid>
          <Row>
            <Col className="pl-0">
              <HomeFeatureCard />
            </Col>
            <Col className="pr-0">
              <HomeFeatureCard />
            </Col>
          </Row>
        </Container>
        <HomeFeatureCard />
        <div className={classes.title}>
          <h5>Trending Items</h5>
        </div>
        {/* <Trending Items /> */}
        <HomeNewlyMinted />
        <div className={classes.title}>
          <h5>Newly Minted</h5>
        </div>
        {/* <Newly Minted /> */}
        <HomeNewlyMinted />
      </div>
    </>
  );
}

export default MarketHome;
