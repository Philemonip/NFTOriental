import Navi from "../components/Common/Navbar";
import HomeNewlyMinted from "../components/Marketplace/Home/HomeNewlyMinted";
import classes from "./MarketHome.module.css";
import "../App.css";
import HomeFeatureCard from "../components/Marketplace/Home/HomeFeatureCard";
import { Container, Row, Col } from "react-bootstrap";

function MarketHome() {
  return (
    <>
      <Navi />
      {/* <Trending Collection /> */}
      {/* <Maybe a Carousel for collection/> */}

      <div className={classes.markethome}>
        <Container fluid>
          <div className={classes.title}>
            <h5>
              <b>Featuring Items</b>
            </h5>
          </div>
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
          <h5>
            <b>Trending Items</b>
          </h5>
        </div>
        {/* <Trending Items /> */}
        <HomeNewlyMinted />
        <div className={classes.title}>
          <h5>
            <b>Newly Minted</b>
          </h5>
        </div>
        {/* <Newly Minted /> */}
        <HomeNewlyMinted />
      </div>
    </>
  );
}

export default MarketHome;
