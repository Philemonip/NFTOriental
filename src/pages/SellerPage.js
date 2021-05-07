import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { browseActions } from "../redux/Marketplace/browseSlice";
import { browseToggleThunk } from "../redux/Marketplace/browseSlice";
import { Jumbotron, Image, Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import BrowseItem from "../components/Marketplace/Browse/BrowseItem";
import BrowseSidebar from "../components/Marketplace/Browse/BrowseSidebar";
import BrowseFilterbar from "../components/Marketplace/Browse/BrowseFilterbar";
import classes from "./MarketBrowse.module.css";
import dotenv from "dotenv";
dotenv.config();

function SellerPage() {
  const dispatch = useDispatch();
  const params = useParams();
  // const [selleritem, setSellerItems] = useState("");
  const { itemArr, statusfilter, collectionfilter } = useSelector(
    (state) => state.browse
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data } = await axios.post(
  //       `${process.env.REACT_APP_API_SERVER}/profile/${params.walletAddress}`,
  //       {
  //         status: state.browse.statusfilter,
  //         collection: state.browse.collectionfilter,
  //         sortoption: state.browse.sortOption,
  //         isSeller: isSeller,
  //         sellerAddress: sellerAddress,
  //       }
  //     );
  //     // dispatch(browseActions.getFiltered(data));
  //     console.log("data from marketbrowse useeffect");
  //     setItems(data);
  //     console.log(data);
  //   };
  //   fetchData();
  // }, [params.walletAddress]);

  useEffect(() => {
    dispatch(browseToggleThunk("clear", "NIL", true, params.walletAddress));
  }, [params.walletAddress, dispatch]);

  // console.log(statusfilter);
  // console.log(collectionfilter);

  return (
    <div className={classes.page}>
      <Navi />

      <Jumbotron className="jumbotron mb-1 p-5">
        <div className="text-center">
          <Image
            className="profileImage"
            src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png"
          />
        </div>
        <div className="mt-3 text-center">
          <h4>Display UserName Here</h4>
          <p>{params.walletAddress}</p>
        </div>
      </Jumbotron>
      <Container fluid>
        <Row>
          <BrowseSidebar />
          <Col className={classes.column}>
            {(statusfilter.length > 0 || collectionfilter.length > 0) && (
              <BrowseFilterbar />
            )}
            <BrowseItem items={itemArr} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SellerPage;
