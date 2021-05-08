import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { browseActions } from "../redux/Marketplace/browseSlice";
import { browseToggleThunk } from "../redux/Marketplace/browseSlice";
import { Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import BrowseItem from "../components/Marketplace/Browse/BrowseItem";
import BrowseSidebar from "../components/Marketplace/Browse/BrowseSidebar";
import SidebarFilterbar from "../components/Common/Sidebar/SidebarFilterbar";
import classes from "./MarketBrowse.module.css";
import dotenv from "dotenv";
dotenv.config();

function MarketBrowse() {
  const dispatch = useDispatch();
  const { itemArr, statusfilter, collectionfilter } = useSelector(
    (state) => state.browse
  );

  //browseToggleThunk: (type, data, isSellers)
  useEffect(() => {
    const fetchData = async () => {
      console.log("First load Marketbrowse");
      await dispatch(browseToggleThunk("init", "", false));
      // console.log("data from marketbrowse useeffect");
    };
    fetchData();
    return function browseclearup() {
      dispatch(browseActions.hardClear());
    };
  }, [dispatch]);

  return (
    <div className={classes.page}>
      <Navi />
      <Container fluid>
        <Row>
          <BrowseSidebar />
          <Col className={classes.column}>
            {(statusfilter.length > 0 || collectionfilter.length > 0) && (
              <SidebarFilterbar isSeller={false} />
            )}
            <BrowseItem items={itemArr} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MarketBrowse;
