import { useState, useEffect } from "react";
import axios from "axios";
import Navi from "../components/Common/Navbar";
import HomeNewlyMinted from "../components/Marketplace/Home/HomeNewlyMinted";
import classes from "./MarketHome.module.css";
import "../App.css";
import HomeFeatureCard from "../components/Marketplace/Home/HomeFeatureCard";
import { Container, Row, Col } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

function MarketHome() {
  // const [trendItem, setTrendItem] = useState([]);
  // const [newItem, setNewItem] = useState([]);
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
            <b>Newly Minted</b>
          </h5>
        </div>
        {/* <Trending Items /> */}
        <HomeNewlyMinted items={homeItem[0]} />
        <div className={classes.title}>
          <h5>
            <b>Trending Items</b>
          </h5>
        </div>
        {/* <Newly Minted /> */}
        <HomeNewlyMinted items={homeItem[1]} />
      </div>
    </>
  );
}

export default MarketHome;
