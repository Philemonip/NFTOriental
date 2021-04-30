// import React, { useState, useEffect } from "react";
// import axios from "axios";
import dotenv from "dotenv";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./BrowseSidebarStatus.module.css";
dotenv.config();

const BrowseSidebarStatus = () => {
  return (
    <Col className="px-0">
      {/* <Container fluid className={classes.browseitem}> */}
      <Container fluid>
        <Row>
          <Col className={classes.statusbutton}>
            <p>Hello1</p>
          </Col>
          <Col className={classes.statusbutton}>
            <p>Hello2</p>
          </Col>
        </Row>
        <Row>
          <Col className={classes.statusbutton}>
            <p>Hello3</p>
          </Col>
          <Col className={classes.statusbutton}>
            <p>Hello4</p>
          </Col>
        </Row>
      </Container>
    </Col>
  );
};

export default BrowseSidebarStatus;
