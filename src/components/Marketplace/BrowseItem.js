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

const BrowseItem = () => {
  // let style = {
  //   maxWidth: "18rem",
  // };
  // let center = {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   flexWrap: "wrap",
  // };

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
                <Col sm lg md={4}>
                  <BrowseItemCard key={index} item={item} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
  // return (
  //   <>
  //     {items &&
  //       items.map((item, index) => {
  //         return (
  //           <Card key={index} style={style}>
  //             <Card.Img variant="top" src={item.image} />
  //             <Card.Body>
  //               <Card.Title>{item.category}</Card.Title>
  //               <Card.Text>{item.title}</Card.Text>
  //             </Card.Body>
  //             <Card.Footer>ETH {item.price}</Card.Footer>
  //           </Card>
  //         );
  //       })}
  //   </>
  // );
};

export default BrowseItem;
