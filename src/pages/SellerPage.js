import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import {
  browseToggleThunk,
  browseActions,
} from "../redux/Marketplace/browseSlice";
import { Jumbotron, Image, Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import ItemGrid from "../components/Common/ItemGrid/ItemGrid";
import SellerSidebar from "../components/Marketplace/Browse_Seller/SellerSidebar";
import SidebarFilterbar from "../components/Common/Sidebar/SidebarFilterbar";
import classes from "./SellerPage.module.css";
import "./ProfilePage.css";

function SellerPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const { itemArr, statusfilter, collectionfilter } = useSelector(
    (state) => state.browse
  );
  const [isCopied, setCopied] = useState(false);

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
  function copyWalletAdress() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 800);
  }

  return (
    <div className={classes.page}>
      <Navi />
      <Jumbotron className="jumbotronProfile mb-2 pb-1 pt-5">
        <div className="text-center">
          <Image
            className="profileImage"
            src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png"
          />
        </div>
      </Jumbotron>
      <div className="mt-3 text-center">
        <h4>{itemArr.length > 0 && itemArr[0].alias}</h4>
        <span className="mx-2">{params.walletAddress}</span>
        <CopyToClipboard text={params.walletAddress} onCopy={copyWalletAdress}>
          <button className="btn">
            <IoMdCopy size={20} />
          </button>
        </CopyToClipboard>
        {isCopied ? <p style={{ color: "grey" }}>Copied!</p> : null}
      </div>

      <Container fluid>
        <Row>
          <SellerSidebar />
          <Col className={classes.column}>
            {(statusfilter.length > 0 || collectionfilter.length > 0) && (
              <SidebarFilterbar isSeller={true} />
            )}
            <ItemGrid items={itemArr} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SellerPage;
