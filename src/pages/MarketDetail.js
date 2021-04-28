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
      console.log('contract is here', contract)
      const getItem = contract.methods.getAllItems().call();
      dispatch(detailSliceActions.updateItem(getItem));
      console.log(getItem);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    };
  };

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
            <DetailTitlePrice />
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
