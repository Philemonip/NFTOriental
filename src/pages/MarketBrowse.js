import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import BrowseItem from "../components/Marketplace/Browse/BrowseItem";
import BrowseSidebar from "../components/Marketplace/Browse/BrowseSidebar";
import BrowseFilterbar from "../components/Marketplace/Browse/BrowseFilterbar";
import classes from "./MarketBrowse.module.css";
import dotenv from "dotenv";
dotenv.config();

function MarketBrowse() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_SERVER}`);
      console.log(data);
      console.log("data from browseitem");
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.page}>
      <Navi />
      <Container fluid>
        <Row>
          <BrowseSidebar />
          <Col className={classes.column}>
            <BrowseFilterbar />
            <BrowseItem items={items} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MarketBrowse;
