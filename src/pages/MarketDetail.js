import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import { addNFTtransactionThunk, updateItemThunk } from "../redux/NFT/nftSlice";
import Navi from "../components/Common/Navbar";
import DetailImgInfo from "../components/Marketplace/Detail/DetailImgInfo";
import DetailTitlePrice from "../components/Marketplace/Detail/DetailTitlePrice";
import DetailTradingHistory from "../components/Marketplace/Detail/DetailTradingHistory";
import classes from "./MarketDetail.module.css";
import dotenv from "dotenv";
import Token from "../abi/Token.json";
import Banco from "../abi/banco.json";
import {
  bancoSliceActions,
  addTransactionThunk,
} from "../redux/Banco/bancoSlice";
dotenv.config();
var web3;
var cch;
var banco;


function MarketDetail() {
  const params = useParams();
  const [item, setItems] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/items/${params.itemAddress}`
      );
      setItems(data);
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
    if (window.ethereum) {
      setLoginStatus(true);
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      await loadBlockchainData();
    } else if (window.web3) {
      setLoginStatus(true);
      window.web3 = new Web3(window.web3.currentProvider);
      await loadBlockchainData();
    } else {
      setLoginStatus(false);
      window.alert("working here");
    }
  }, []);

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
      const getToken = await contract.methods.getToken(params.itemAddress).call();
      dispatch(detailSliceActions.updateToken(getToken));
      const itemOwner = await contract.methods.getOwner(params.itemAddress).call();
      dispatch(detailSliceActions.updateOwner(itemOwner));

      console.log(itemOwner)
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
        console.log(getItem, "please get this item");
        const NFTitem = getItem.filter((i) => i.id == tokenId);
        console.log(NFTitem);
        const owner = NFTitem[0].owner;
        const forSale = NFTitem[0].forSale;
        const price = NFTitem[0].price;

        await dispatch(
          addNFTtransactionThunk({
            token_id: tokenId,
            from_address: targetAccount,
            to_address: currentUser,
            price: 20,
            owner: owner,
            current_price: price,
            on_sale: forSale,
          })
        );
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
    await dispatch(
      addTransactionThunk({
        fromAddress: currentUser,
        toAddress: targetAccount,
        amount: `${amount}`,
        category: "Purchase NFT",
        currency: "CCH",
      })
    );
  }

  async function itemOnSale(tokenId, price) {
    try {
      await contractNFT.methods
        .tokenOnSale(tokenId, price)
        .send({ from: currentUser });
      const getItem = await contractNFT.methods.getAllItems().call();
      await dispatch(detailSliceActions.updateItem(getItem));
      const NFTitem = getItem.filter((i) => i.id === tokenId);
      const owner = NFTitem[0].owner;
      const forSale = NFTitem[0].forSale;

      await dispatch(
        updateItemThunk({
          token_id: tokenId,
          owner: owner,
          current_price: price,
          on_sale: forSale,
        })
      );
    } catch (err) {
      console.log("item on sale error", err);
    }
  }

  async function itemNotForSale(tokenId) {
    try {
      await contractNFT.methods.notForSale(tokenId).send({ from: currentUser });
      const getItem = await contractNFT.methods.getAllItems().call();
      await dispatch(detailSliceActions.updateItem(getItem));
      const NFTitem = getItem.filter((i) => i.id === tokenId);
      const owner = NFTitem[0].owner;
      const forSale = NFTitem[0].forSale;
      const price = NFTitem[0].price;

      await dispatch(
        updateItemThunk({
          token_id: tokenId,
          owner: owner,
          current_price: price,
          on_sale: forSale,
        })
      );
    } catch (err) {
      console.log("item not for sale error", err);
    }
  }

  return (
    <div>
      <Navi />
      <Container className={classes.containerstyle}>
        {params.itemAddress && currentUser ? (
          <p>
            You are in ItemDetail, address: {params.itemAddress}, you are
            {currentUser}
          </p>
        ) : (
          <p>You are in ItemDetail, address: {params.itemAddress}</p>
        )}
        <Row>
          <Col xl={5}>
            {item ? (
              <DetailImgInfo itemdata={item[0]} loginStatus={loginStatus} />
            ) : (
              ""
            )}
          </Col>
          <Col>
            {item ? (
              <DetailTitlePrice
                itemdata={item[0]}
                buyWithoutApprovalToken={buyWithoutApprovalToken}
                token_id={params.itemAddress}
                loginStatus={loginStatus}
                itemNotForSale={itemNotForSale}
                itemOnSale={itemOnSale}
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row className={classes.tradehistoryrow}>
          {item ? <DetailTradingHistory itemdata={item} /> : ""}
        </Row>
      </Container>
    </div>
  );
}

export default MarketDetail;
