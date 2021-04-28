import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import Navi from "../components/Common/Navbar";
import DetailImgInfo from "../components/Marketplace/DetailImgInfo";
import DetailTitlePrice from "../components/Marketplace/DetailTitlePrice";
import DetailTradingHistory from "../components/Marketplace/DetailTradingHistory";
import "../App.css";

function MarketDetail() {
  const params = useParams();
  const web3 = useSelector((state) => state.detail.web3);
  const owner = useSelector((state) => state.detail.owner);
  const contractNFT = useSelector((state) => state.detail.contract);
  const items = useSelector((state) => state.detail.items);

  const dispatch = useDispatch();

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log('web 3 enable is fine')
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log('web 3 current provider is fine')
    } else {
      window.alert(
        "Please login with Metamask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    dispatch(detailSliceActions.updateWeb3(web3));
    dispatch(detailSliceActions.updateOwner(accounts[0]));
    console.log('owner', accounts[0])

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
      console.log(await contract.methods.getOwner(1).call());
      console.log(await contract.methods.getOwnertwo(1).call());
      console.log(await contract.methods.getURI(1).call());
      const getToken = await contract.methods.getToken(1).call();
      console.log(getToken.creator)
    } else {
      window.alert("Smart contract not deployed to detected network.");
    };
  };

  async function mint(itemName) {
    try {
      await contractNFT.methods
        .Mint(itemName)
        .send({ from: owner });
      console.log("minted")
      const whatisthis = await contractNFT.methods.getAllItems().call();
      console.log("done?", whatisthis)
    } catch (err) {
      console.log("minting error", err)
    }
  }

  async function itemOnSale(tokenId, price) {
    console.log("item on sale")
    try {
      await contractNFT.methods
        .tokenOnSale(tokenId, price)
        .send({ from: owner })
    } catch (err) {
      console.log("item on sale error", err)
    }
  }

  async function itemNotForSale(tokenId) {
    try {
      await contractNFT.methods
        .notForSale(tokenId)
        .send({ from: owner })
    } catch (err) {
      console.log("item not for sale error", err)
    }
  }

  async function approveTo(buyer, tokenId) {
    try {
      await contractNFT.methods
        .approvalTo(buyer, tokenId)
        .send({ from: owner })
    } catch (err) {
      console.log("approving to buyer error", err)
    }
  }

  async function cancelApproval(tokenId) {
    try {
      await contractNFT.methods
        .cancelApproval(tokenId)
        .send({ from: owner })
    } catch (err) {
      console.log("cancel approval error", err)
    }
  }

  async function buyToken(tokenId) {
    try {
      await contractNFT.methods
        .buyingFrom(tokenId)
        .send({ from: owner })
    } catch (err) {
      console.log("buying error", err)
    }
  }

  async function burnToken(tokenId) {
    try {
      await contractNFT.methods
        .burnToken(tokenId)
        .send({ from: owner })
    } catch (err) {
      console.log("burning token error", err);
    }
  }

  return (
    <div className="App">
      <Navi />
      <Container fluid>
        {params.itemAddress && (
          <p>You are in ItemDetail, address: {params.itemAddress}, you are {owner}</p>
        )}
        <Row>
          <Col>
            <DetailImgInfo />
          </Col>
          <Col>
            <DetailTitlePrice mint={mint} />
          </Col>
        </Row>
        <Row>
          <DetailTradingHistory />
        </Row>
      </Container>
    </div>
  );
}

export default MarketDetail;
