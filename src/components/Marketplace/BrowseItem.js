import React, { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
// import Card from "react-bootstrap/Card";
import BrowseItemCard from "./BrowseItemCard";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { Container, Row, Col } from "react-bootstrap";
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
  }, [items]);

  return (
    <>
      <Container fluid>
        <Row>
          {items &&
            items.map((item, index) => {
              return (
                <Col className="mt-4" xs={12} sm={6} md={4} lg={4} xl={3}>
                  <BrowseItemCard key={index} item={item} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
};

export default BrowseItem;
