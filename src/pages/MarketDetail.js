import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import DetailImgInfo from "../components/Marketplace/DetailImgInfo";
import DetailTitlePrice from "../components/Marketplace/DetailTitlePrice";
import DetailTradingHistory from "../components/Marketplace/DetailTradingHistory";
import classes from "./MarketDetail.module.css";
import dotenv from "dotenv";
dotenv.config();

function MarketDetail() {
  const params = useParams();
  const [item, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/${params.itemAddress}`
      );
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, [params.itemAddress]);

  return (
    <div>
      <Navi />
      <Container className={classes.containerstyle}>
        {params.itemAddress && (
          <p>You are in ItemDetail, address: {params.itemAddress}</p>
        )}
        <Row>
          <Col xl={5}>
            <DetailImgInfo itemdata={item} />
          </Col>
          <Col>
            <DetailTitlePrice itemdata={item} />
          </Col>
        </Row>
        <Row className={classes.tradehistoryrow}>
          <DetailTradingHistory />
        </Row>
      </Container>
    </div>
  );
}

export default MarketDetail;
