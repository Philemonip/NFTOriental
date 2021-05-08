import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  browseToggleThunk,
  browseActions,
} from "../redux/Marketplace/browseSlice";
import { Jumbotron, Image, Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import BrowseItem from "../components/Marketplace/Browse/BrowseItem";
import SellerSidebar from "../components/Marketplace/Seller/SellerSidebar";
import SidebarFilterbar from "../components/Common/Sidebar/SidebarFilterbar";
import classes from "./MarketBrowse.module.css";
import dotenv from "dotenv";
dotenv.config();

function SellerPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { itemArr, statusfilter, collectionfilter } = useSelector(
    (state) => state.browse
  );

  //browseToggleThunk: (type, data, isSeller)
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(browseActions.getSellerAddress(params.walletAddress));
      await dispatch(browseToggleThunk("init", "", true));
    };
    fetchData();
    return function browseclearup() {
      dispatch(browseActions.hardClear());
    };
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
          <SellerSidebar />
          <Col className={classes.column}>
            {(statusfilter.length > 0 || collectionfilter.length > 0) && (
              <SidebarFilterbar isSeller={true} />
            )}
            <BrowseItem items={itemArr} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SellerPage;
