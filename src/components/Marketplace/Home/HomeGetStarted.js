import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./HomeGetStarted.module.css";
import HomeGetStartedInfo from "./HomeGetStartedInfo";
import {
  FaTags,
  FaWallet,
  FaCloudUploadAlt,
  FaShoppingCart,
  FaCoins,
} from "react-icons/fa";

const SellerItems = [
  {
    logo: <FaWallet />,
    title: "Connect to Metamask",
    body: "OceanNFT is powered by Metamask on Ethereum Rinkeby Network, connect OceanNFT with Metamask to access all the functions we offer including Cinco Chicos Coin (CCH) earning and NFT item transactions.",
  },
  {
    logo: <FaCloudUploadAlt />,
    title: "Add your NFTs",
    body: "While connected to Metamask, open the Create NFT tab in your profile page, upload your work (JEPG, PNG or GIF), add a title and description. We will create a brand new NFT for you on the Ethereum blockchain",
  },
  {
    logo: <FaTags />,
    title: "List NFTs for sale",
    body: "Pick the perfect price for your NFTs, our NFTs are traded in Cinco Chicos Coin (CCH). You choose how you want to sell your NFTs, and we help you sell them!",
  },
];

const BuyerItems = [
  {
    logo: <FaWallet />,
    title: "Connect to Metamask",
    body: "OceanNFT is powered by Metamask on Ethereum Rinkeby Network, connect OceanNFT with Metamask to access all the functions we offer including Cinco Chicos Coin (CCH) earning and NFT item transactions.",
  },
  {
    logo: <FaCoins />,
    title: "Earn CCH",
    body: "Our NFTs are traded in Cinco Chicos Coin (CCH), you can earn CCH by depositing Ethereum (ETH) into our De-Fi bank, and earn intested based on the amount and duration your have deposited your ETH.",
  },
  {
    logo: <FaShoppingCart />,
    title: "Get your Favourite NFTs",
    body: "Pick your favourite NFTs from one of our 6 unique collections. After purchase, You can list them on sale again later to trade with other users, or list your NFTs with ",
  },
];

const HomeGetStarted = () => {
  const [isBuyer, setIsBuyer] = useState(false);
  const buy = isBuyer ? classes.activebutton : "";
  const sell = isBuyer ? "" : classes.activebutton;

  return (
    <Container fluid className={classes.container}>
      <Row className={classes.buttonrow}>
        <Col className="px-0">
          <div
            className={`mr-3 ${classes.infobutton} ${sell}`}
            onClick={() => setIsBuyer(false)}
          >
            <p className={classes.ptext}>Seller</p>
          </div>
        </Col>
        <Col className="px-0">
          <div
            className={`ml-3 ${classes.infobutton} ${buy}`}
            onClick={() => setIsBuyer(true)}
          >
            <p className={classes.ptext}>Buyer</p>
          </div>
        </Col>
      </Row>
      <Row className={classes.contentrow}>
        {isBuyer ? (
          <HomeGetStartedInfo Items={BuyerItems} />
        ) : (
          <HomeGetStartedInfo Items={SellerItems} />
        )}
        {/* <HomeGetStartedInfo Items={BuyerItems} /> */}
        {/* <HomeGetStartedInfo Items={SellerItems} /> */}
      </Row>
    </Container>
  );
};

export default HomeGetStarted;
