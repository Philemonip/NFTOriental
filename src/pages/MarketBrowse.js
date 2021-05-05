import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { browseActions } from "../redux/Marketplace/browseSlice";
// import {
//   browseToggleThunk,
// } from "../redux/Marketplace/browseSlice";
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
  const dispatch = useDispatch();
  const { itemArr } = useSelector((state) => state.browse);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/metadata/`
      );
      dispatch(browseActions.getFiltered(data));
      console.log("data from marketbrowse useeffect");
      console.log(data);
    };
    fetchData();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(browseToggleThunk("clear"));
  // }, [dispatch]);

  return (
    <div className={classes.page}>
      <Navi />
      <Container fluid>
        <Row>
          <BrowseSidebar />
          <Col className={classes.column}>
            <BrowseFilterbar />
            <BrowseItem items={itemArr} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MarketBrowse;
