import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import {
  addNFTtransactionThunk,
  updateItemThunk,
} from "../redux/NFT/nftSlice";
import Navi from "../components/Common/Navbar";
import DetailImgInfo from "../components/Marketplace/Detail/DetailImgInfo";
import DetailTitlePrice from "../components/Marketplace/Detail/DetailTitlePrice";
import DetailTradingHistory from "../components/Marketplace/Detail/DetailTradingHistory";
import classes from "./MarketDetail.module.css";
import dotenv from "dotenv";
import Token from "../abi/Token.json";
import Banco from "../abi/banco.json";
import { bancoSliceActions } from "../redux/Banco/bancoSlice";
dotenv.config();
var web3;
var cch;
var banco;

function MarketDetail() {
  const params = useParams();
  const [item, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/metadata/${params.itemAddress}`
      );
      setItems(data[0]);
    };
    fetchData();
  }, [params.itemAddress]);

  // const web3 = useSelector((state) => state.detail.web3);
  const currentUser = useSelector((state) => state.detail.currentUser);
  const contractNFT = useSelector((state) => state.detail.contract);
  // const items = useSelector((state) => state.detail.items);
  // const token = useSelector((state) => state.detail.token);
  // const cchBalance = useSelector((state) => state.banco.cchBalance);

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
      window.alert("Please login with Metamask.");
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
      cch = new web3.eth.Contract(Token.abi, Token.networks[networkId].address);
      banco = new web3.eth.Contract(
        Banco.abi,
        Banco.networks[networkId].address
      );
      const cchBalanceInWei = await cch.methods.balanceOf(accounts[0]).call();
      dispatch(
        bancoSliceActions.updateCchBalance(
          web3.utils.fromWei(`${cchBalanceInWei}`)
        )
      );
    } else {
      window.alert("Please use correct network and refresh the page.");
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

  async function buyWithoutApprovalToken(tokenId, cchBalance) {
    if (cchBalance * 1e18 > 0.01 * 1e18) {
      try {
        const targetAccount = await contractNFT.methods.ownerOf(tokenId).call();
        transferCCH(targetAccount, 0.01 * 1e18);
        //need another dispatch here

        console.log("hi", targetAccount);
        await contractNFT.methods
          .buyingWithoutApproval(tokenId)
          .send({ from: currentUser });

        const getItem = await contractNFT.methods.getAllItems().call();
        await dispatch(detailSliceActions.updateItem(getItem));
        console.log(getItem, 'please get this item')
        const NFTitem = getItem.filter(i => i.id == tokenId);
        console.log(NFTitem)
        const owner = NFTitem[0].owner;
        const forSale = NFTitem[0].forSale;
        const price = NFTitem[0].price;

        await dispatch(addNFTtransactionThunk({
          token_id: tokenId,
          from_address: targetAccount,
          to_address: currentUser,
          price: 20,
          owner: owner,
          current_price: price,
          on_sale: forSale,
        })
        )
      } catch (err) {
        console.log("buying error", err);
      }
    }
  }

  //transfer cch
  async function transferCCH(targetAccount, amount) {
    await cch.methods
      .transfer(targetAccount, `${amount}`)
      .send({ from: currentUser });
  }

  // //admin page
  async function mint(itemName) {
    try {
      await contractNFT.methods.mint(itemName).send({ from: currentUser });
      const minting = await contractNFT.methods.getAllItems().call();
      console.log("minted", minting);
    } catch (err) {
      console.log("minting error", err);
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
            <DetailTitlePrice
              itemdata={item}
              mint={mint}
              buyWithoutApprovalToken={buyWithoutApprovalToken}
              token_id={params.itemAddress}
            />
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
