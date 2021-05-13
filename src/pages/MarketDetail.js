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
import DetailRight from "../components/Marketplace/Detail/DetailRight";
import DetailLeft from "../components/Marketplace/Detail/DetailLeft";
import DetailTradingHistory from "../components/Marketplace/Detail/DetailTradingHistory";
import LoadModal from "../components/Common/LoadModal";
import classes from "./MarketDetail.module.css";
import dotenv from "dotenv";
import Token from "../abi/Token.json";
import {
  bancoSliceActions,
  addTransactionThunk,
} from "../redux/Banco/bancoSlice";
dotenv.config();
var web3;
var cch;
var contractNFT;

function MarketDetail() {
  const params = useParams();
  const [item, setItems] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const etherscanLoad = useSelector((state) => state.detail.etherscanLoad);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/items/asset/${params.itemAddress}`
      );
      setItems(data);
    };
    fetchData();
  }, [params.itemAddress]);

  // const web3 = useSelector((state) => state.detail.web3);
  const currentUser = useSelector((state) => state.detail.currentUser);
  // const contractNFT = useSelector((state) => state.detail.contract);
  // const items = useSelector((state) => state.detail.items);
  // const token = useSelector((state) => state.detail.token);
  // const cchBalance = useSelector((state) => state.banco.cchBalance);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      //Declare laodBlockchainData
      const loadBlockchainData = async () => {
        web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        // dispatch(detailSliceActions.updateWeb3(web3));
        dispatch(detailSliceActions.updateCurrentUser(accounts[0]));
        console.log("current user:", accounts[0]);

        //load contract
        const networkData = CloseSeaNFT.networks[networkId];

        if (networkData) {
          const abi = CloseSeaNFT.abi;
          const address = networkData.address;
          contractNFT = new web3.eth.Contract(abi, address);
          // dispatch(detailSliceActions.updateContract(contract));
          const getItem = await contractNFT.methods.getAllItems().call();
          dispatch(detailSliceActions.updateItem(getItem));
          console.log(getItem);
          const getToken = await contractNFT.methods
            .getToken(params.itemAddress)
            .call();
          dispatch(detailSliceActions.updateToken(getToken));
          const itemOwner = await contractNFT.methods
            .getOwner(params.itemAddress)
            .call();
          dispatch(detailSliceActions.updateOwner(itemOwner));

          console.log(itemOwner);

          cch = new web3.eth.Contract(
            Token.abi,
            Token.networks[networkId].address
          );
          const cchBalanceInWei = await cch.methods
            .balanceOf(accounts[0])
            .call();
          dispatch(
            bancoSliceActions.updateCchBalance(
              web3.utils.fromWei(`${cchBalanceInWei}`)
            )
          );
        } else {
          window.alert("Please use correct network and refresh the page.");
        }
      };
      //Check for metamask status
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
    };
    fetchData();
  }, [dispatch, params.itemAddress]);

  //marketplace
  // async function buyApprovalToken(tokenId) {
  //   try {
  //     await contractNFT.methods
  //       .buyingWithApproval(tokenId)
  //       .send({ from: currentUser });
  //   } catch (err) {
  //     console.log("buying error", err);
  //   }
  // }

  async function buyWithoutApprovalToken(tokenId, NFTprice) {
    const cchBalance = await cch.methods.balanceOf(currentUser).call();
    if (cchBalance > NFTprice * 1e18) {
      try {
        dispatch(detailSliceActions.updateEtherscanLoad(true));
        const targetAccount = await contractNFT.methods.ownerOf(tokenId).call();
        transferCCH(targetAccount, NFTprice * 1e18);
        //need another dispatch here

        console.log("hi", targetAccount);
        const transaction = await contractNFT.methods
          .buyingWithoutApproval(tokenId)
          .send({ from: currentUser })
          .on("transactionHash", function (hash) {
            console.log("hash on(transactionHash nft " + hash);
            dispatch(detailSliceActions.updateNftHash(hash));
          });

        const getItem = await contractNFT.methods.getAllItems().call();
        await dispatch(detailSliceActions.updateItem(getItem));
        console.log(getItem, "please get this item");
        const NFTitem = getItem.filter((i) => i.id === tokenId);
        console.log(NFTitem);
        const owner = NFTitem[0].owner;
        const NFThash = transaction.transactionHash;
        console.log(NFThash);

        await dispatch(
          addNFTtransactionThunk({
            token_id: tokenId,
            from_address: targetAccount,
            to_address: currentUser,
            price: NFTprice,
            hash: NFThash,
            owner: owner,
            current_price: 0,
            on_sale: false,
          })
        );
        dispatch(detailSliceActions.updateEtherscanLoad(false));
        //null cch nft
        dispatch(detailSliceActions.updateCchHash(null));
        dispatch(detailSliceActions.updateNftHash(null));
        // window.location.reload();
      } catch (err) {
        console.log("buying error", err);
        dispatch(detailSliceActions.updateEtherscanLoad(false));
        //null cch nft
        dispatch(detailSliceActions.updateCchHash(null));
        dispatch(detailSliceActions.updateNftHash(null));
      }
    } else {
      window.alert(
        "Not enough funds! Please top up your CCH balance to purchase the NFT."
      );
    }
  }

  //transfer cch
  async function transferCCH(targetAccount, amount) {
    await cch.methods
      .transfer(targetAccount, `${amount}`)
      .send({ from: currentUser })
      .on("transactionHash", function (hash) {
        console.log("hash on(transactionHash cch " + hash);
        dispatch(detailSliceActions.updateCchHash(hash));
      });
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
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods
        .tokenOnSale(tokenId, `${price * 1e18}`)
        .send({ from: currentUser })
        .on("transactionHash", function (hash) {
          console.log("hash on(transactionHash nft " + hash);
          dispatch(detailSliceActions.updateNftHash(hash));
        });
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
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
      // window.location.reload();
    } catch (err) {
      console.log("item on sale error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
    }
  }

  async function itemNotForSale(tokenId) {
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods
        .notForSale(tokenId)
        .send({ from: currentUser })
        .on("transactionHash", function (hash) {
          console.log("hash on(transactionHash nft " + hash);
          dispatch(detailSliceActions.updateNftHash(hash));
        });
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
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
      // window.location.reload();
    } catch (err) {
      console.log("item not for sale error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
    }
  }
  /////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <Navi />
      <Container className={classes.containerstyle}>
        <Row className="ml-0">
          <>
            {item && (
              <div className="ml-2 my-2">
                <span className={classes.collection}>{item[0].collection}</span>
                <br />
                <span className={`${classes.title}`}>{item[0].name} </span>
              </div>
            )}
          </>
        </Row>
        <Row>
          <Col>
            {item && (
              <DetailLeft
                itemdata={item[0]}
                buyWithoutApprovalToken={buyWithoutApprovalToken}
                token_id={params.itemAddress}
                loginStatus={loginStatus}
                itemNotForSale={itemNotForSale}
                itemOnSale={itemOnSale}
              />
            )}
          </Col>
          <Col>
            {item ? (
              <DetailRight itemdata={item[0]} loginStatus={loginStatus} />
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row className={classes.tradehistoryrow}>
          {item ? <DetailTradingHistory itemdata={item} /> : ""}
        </Row>
      </Container>
      <LoadModal show={etherscanLoad} />
    </div>
  );
}

export default MarketDetail;
