import { useState, useEffect } from "react";
import axios from "axios";
import Navi from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import HomeItemRow from "../components/Marketplace/Home/HomeItemRow";
import classes from "./MarketHome.module.css";
import "../App.css";
import HomeFeatureCard from "../components/Marketplace/Home/HomeFeatureCard";
import HomeCollections from "../components/Marketplace/Home/HomeCollections";
import HomeGetStarted from "../components/Marketplace/Home/HomeGetStarted";
import HomeCarousel from "../components/Marketplace/Home/HomeCarousel";

import { Container, Row, Col } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

function MarketHome() {
  const [homeItem, setHomeItem] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/items/homepage`,
          {
            cancelToken: source.token,
          }
        );
        setHomeItem(data);
        console.log(data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <Navi />
      <div className={classes.carouseldiv}>
        <HomeCarousel />
      </div>
      <div className={classes.markethome}>
        <Container fluid>
          {/* <div className={classes.lefttitle}>
            <h5>
              <b>Featuring Items</b>
            </h5>
          </div> */}
          <Row>
            <Col className="pl-0">
              <HomeFeatureCard />
            </Col>
            <Col className="pr-0">
              <HomeFeatureCard />
            </Col>
          </Row>
        </Container>
        {/* <HomeCarousel /> */}
        <div className={classes.lefttitle}>
          <h5>
            <b>Newly Minted</b>
          </h5>
        </div>
        <HomeItemRow items={homeItem[0]} />
        <div className={classes.lefttitle}>
          <h5>
            <b>Trending Items</b>
          </h5>
        </div>
        <HomeItemRow items={homeItem[1]} />
        <div className={classes.centertitlediv}>
          <p className={classes.centertitle}>Browse by collections</p>
        </div>
        <HomeCollections />
        <div className={classes.centertitlediv}>
          <p className={classes.centertitle}>
            Get started creating & selling your NFTs
          </p>
        </div>
        <HomeGetStarted />
      </div>
      <Footer />
    </>
  );
}

export default MarketHome;
