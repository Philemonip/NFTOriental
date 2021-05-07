import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { browseActions } from "../redux/Marketplace/browseSlice";
// import {
//   browseToggleThunk,
// } from "../redux/Marketplace/browseSlice";
import { Jumbotron, Image, Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import SellerBrowseItem from "../components/Marketplace/SellerBrowse/SellerBrowseItem";
import BrowseSidebar from "../components/Marketplace/Browse/BrowseSidebar";
import BrowseFilterbar from "../components/Marketplace/Browse/BrowseFilterbar";
import classes from "./MarketBrowse.module.css";
import dotenv from "dotenv";
dotenv.config();

function BrowseSellerPage() {
  const params = useParams();
  const [item, setItems] = useState("");
  const { itemArr, statusfilter, collectionfilter } = useSelector(
    (state) => state.browse
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/profile/${params.walletAddress}`
      );
      // dispatch(browseActions.getFiltered(data));
      // console.log("data from marketbrowse useeffect");
      setItems(data);
      console.log(data);
    };
    fetchData();
  }, [params.itemAddress]);

  // useEffect(() => {
  //   dispatch(browseToggwleThunk("clear"));
  // }, [dispatch]);
  console.log(statusfilter);
  console.log(collectionfilter);
  const dispatch = useDispatch();

  return (
    <div className={classes.page}>
      <Navi />
      <Container fluid>
        <Jumbotron className="jumbotron mb-1 p-5">
          <div xs={6} md={4} className="text-center">
            <Image
              className="profileImage"
              src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png"
            />
          </div>
        </Jumbotron>
        <div className="text-center">
          <h4>UserName</h4>
          <p>{params.walletAddress}</p>
        </div>
        <Row>
          <BrowseSidebar />
          <Col className={classes.column}>
            {(statusfilter.length > 0 || collectionfilter.length > 0) && (
              <BrowseFilterbar />
            )}
            <BrowseFilterbar />
            <SellerBrowseItem items={item} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default BrowseSellerPage;
