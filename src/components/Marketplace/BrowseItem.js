import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import BrowseItemCard from "./BrowseItemCard";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./BrowseItem.module.css";
dotenv.config();

//FIXME: Center the cards

const BrowseItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        // `${process.env.REACT_APP_API_SERVER}/api/user`
        `${process.env.REACT_APP_API_SERVER}`
      );
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <Col className="px-0">
      <Container fluid className={classes.browseitem}>
        <Row>
          {items &&
            items.map((item, index) => {
              return (
                // <Col className="mt-4" xs={12} sm={6} md={4} lg={4} xl={3}>
                <Col className="mt-4 d-flex justify-content-center" key={index}>
                  <BrowseItemCard item={item} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </Col>
  );
};

export default BrowseItem;
