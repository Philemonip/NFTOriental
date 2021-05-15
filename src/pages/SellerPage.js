import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import {
  browseToggleThunk,
  browseActions,
} from "../redux/Marketplace/browseSlice";
import { Jumbotron, Col, Container, Row } from "react-bootstrap";
import Navi from "../components/Common/Navbar";
import ItemGrid from "../components/Common/ItemGrid/ItemGrid";
import SellerSidebar from "../components/Marketplace/Browse_Seller/SellerSidebar";
import SidebarFilterbar from "../components/Common/Sidebar/SidebarFilterbar";
import ProfilePicSwitch from "../components/Common/ProfilePicSwitch";
import classes from "./SellerPage.module.css";
// import "./ProfilePage.css";

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
      await dispatch(browseToggleThunk("sort", "CREATE_DATE", true));
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
  // mb-2 pb-1 pt-5
  return (
    <div className={classes.page}>
      <Navi />
      <Jumbotron className={classes.jumbotronProfile}>
        <ProfilePicSwitch address={params.walletAddress} />
        <h4 className="mt-3">
          <b>{itemArr.length > 0 && itemArr[0].alias}</b>
        </h4>
        <span className="mx-2">{params.walletAddress}</span>
        <CopyToClipboard text={params.walletAddress} onCopy={copyWalletAdress}>
          <button className="btn">
            <IoMdCopy size={20} />
          </button>
        </CopyToClipboard>
        {isCopied ? (
          <span className="mx-2" style={{ color: "grey" }}>
            Copied!
          </span>
        ) : null}
      </Jumbotron>

      <Container fluid>
        <Row>
          <SellerSidebar />
          <Col className={classes.column}>
            {(statusfilter.length > 0 || collectionfilter.length > 0) && (
              <SidebarFilterbar isSeller={true} />
            )}
            <ItemGrid items={itemArr} overflowOption={"visible"} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SellerPage;
