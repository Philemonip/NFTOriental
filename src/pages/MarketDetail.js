import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import Navi from "../components/Common/Navbar";
import DetailImgInfo from "../components/Marketplace/Detail/DetailImgInfo";
import DetailTitlePrice from "../components/Marketplace/Detail/DetailTitlePrice";
import DetailTradingHistory from "../components/Marketplace/Detail/DetailTradingHistory";
import classes from "./MarketDetail.module.css";
import dotenv from "dotenv";
dotenv.config();

function MarketDetail() {
  const params = useParams();
  const [item, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/${params.itemAddress}`
      );
      console.log(data);
      setItems(data);
    };
    fetchData();
  }, [params.itemAddress]);
  const web3 = useSelector((state) => state.detail.web3);
  const currentUser = useSelector((state) => state.detail.currentUser);
  const contractNFT = useSelector((state) => state.detail.contract);
  const items = useSelector((state) => state.detail.items);
  const token = useSelector((state) => state.detail.token);

  const dispatch = useDispatch();

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("Please login with Metamask!");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    dispatch(detailSliceActions.updateWeb3(web3));
    dispatch(detailSliceActions.updateCurrentUser(accounts[0]));
    console.log("current user:", accounts[0]);

    //load contract
    const networkData = CloseSeaNFT.networks[networkId];

    if (networkData) {
      const abi = CloseSeaNFT.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      console.log(address, "address");
      dispatch(detailSliceActions.updateContract(contract));
      const getItem = await contract.methods.getAllItems().call();
      dispatch(detailSliceActions.updateItem(getItem));
      console.log(getItem);
      const getToken = await contract.methods.getToken(0).call();
      console.log("get token", getToken);
      dispatch(detailSliceActions.updateToken(getToken));
      // console.log("getowner", await contract.methods.getOwner(0).call());
      // console.log("getowner2", await contract.methods.getOwnertwo(0).call());
      // console.log("get uri", await contract.methods.getURI(0).call());
      // console.log("approve?", await contract.methods.isApproved(0).call());
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  //marketplace
  async function buyApprovalToken(tokenId) {
    try {
      await contractNFT.methods
        .buyingWithApproval(tokenId)
        .send({ from: currentUser });
    } catch (err) {
      console.log("buying error", err);
    }
  }

  async function buyWithoutApprovalToken(tokenId) {
    try {
      await contractNFT.methods
        .buyingWithoutApproval(tokenId)
        .send({ from: currentUser });
    } catch (err) {
      console.log("buying error", err);
    }
  }

  //admin page
  async function mint(itemName) {
    try {
      await contractNFT.methods.mint(itemName).send({ from: currentUser });
      const minting = await contractNFT.methods.getAllItems().call();
      console.log("minted", minting);
    } catch (err) {
      console.log("minting error", err);
    }
  }

  //admin page
  async function itemOnSale(tokenId, price) {
    console.log("item on sale");
    try {
      await contractNFT.methods
        .tokenOnSale(tokenId, price)
        .send({ from: currentUser });
    } catch (err) {
      console.log("item on sale error", err);
    }
  }

  //admin page
  async function itemNotForSale(tokenId) {
    try {
      await contractNFT.methods.notForSale(tokenId).send({ from: currentUser });
    } catch (err) {
      console.log("item not for sale error", err);
    }
  }

  //admin page
  async function approveTo(buyer, tokenId) {
    try {
      await contractNFT.methods
        .approvalTo(buyer, tokenId)
        .send({ from: currentUser });
    } catch (err) {
      console.log("approving to buyer error", err);
    }
  }

  //admin page
  async function cancelApproval(tokenId) {
    try {
      await contractNFT.methods
        .cancelApproval(tokenId)
        .send({ from: currentUser });
    } catch (err) {
      console.log("cancel approval error", err);
    }
  }

  //admin page
  async function burnToken(tokenId) {
    try {
      await contractNFT.methods.burnToken(tokenId).send({ from: currentUser });
    } catch (err) {
      console.log("burning token error", err);
    }
  }

  return (
    <div>
      <Navi />
      <Container className={classes.containerstyle}>
        {params.itemAddress && (
          <p>
            You are in ItemDetail, address: {params.itemAddress}, you are
            {currentUser}
          </p>
        )}
        <Row>
          <Col xl={5}>
            <DetailImgInfo itemdata={item} />
          </Col>
          <Col>
            <DetailTitlePrice itemdata={item} mint={mint} />
          </Col>
        </Row>
        <Row className={classes.tradehistoryrow}>
          <DetailTradingHistory />
        </Row>
      </Container>
    </div>
  );
}

export default MarketDetail;
