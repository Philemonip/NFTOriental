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
  FaEthereum,
} from "react-icons/fa";

const SellerItems = [
  {
    logo: <FaWallet />,
    title: "Connect to Metamask",
    body: "OrientalNFT is powered by Metamask on Ethereum Rinkeby Network. Connect to OrientalNFT with your Metamask account to access all the functions we offer including receiving Cinco Chicos Coin (CCH) at our De-Fi bank and making NFT transactions.",
  },
  {
    logo: <FaCloudUploadAlt />,
    title: "Create your own NFT",
    body: "Once connected to your Metamask account, click on the Create NFT tab on your profile page, upload your work (JEPG, PNG or GIF file), add a title and description. We will create a brand new NFT for your work on the Ethereum blockchain",
  },
  {
    logo: <FaTags />,
    title: "List NFTs for sale",
    body: "Choose the price you wish to sell for your NFTs, which is traded in Cinco Chicos Coin (CCH). Other users on OrientalNFT will be able to purchase your NFTs once your NFT is listed on sale.",
  },
];

const BuyerItems = [
  {
    logo: <FaWallet />,
    title: "Connect to Metamask",
    body: "OrientalNFT is powered by Metamask on Ethereum Rinkeby Network. Connect to OrientalNFT with your Metamask account to access all the functions we offer including receiving Cinco Chicos Coin (CCH) at our De-Fi bank and making NFT transactions.",
  },
  {
    logo: <FaEthereum />,
    title: "Import CCH to Metamask",
    body: "In your Metamask extention, scroll to bottom in the mainpage, press 'Add Token', then paste '0xbe63D70116B4efd27b7Ed42F0851BdF6d6ae3DbB' in the Token Contract Address, press 'Next' afterwards to add our ERC20 token to your Metamask wallet.",
  },
  {
    logo: <FaCoins />,
    title: "Earn CCH",
    body: "Our NFTs are traded in ERC-20 compliant Cinco Chicos Coin (CCH), you can earn CCH as interest by depositing Ethereum (ETH) into our De-Fi bank. The amount of CCH you earn is based on the amount of ETH you have deposited and the duration of deposit.",
  },
  {
    logo: <FaShoppingCart />,
    title: "Buy your Favourite NFT",
    body: "Browse and purchase your favourite NFTs from one of our 6 unique collections. After your purchase, you can list them on sale again to trade with other users on OrientalNFT.",
  },
];

const HomeGetStarted = () => {
  // Button active state
  const [isBuyer, setIsBuyer] = useState(false);
  const buy = isBuyer ? classes.activebutton : "";
  const sell = isBuyer ? "" : classes.activebutton;

  return (
    <Container fluid className={classes.container}>
      <Row className={classes.buttonrow}>
        <Col className="px-0">
          <div
            className={` ${classes.infobutton} ${sell}`}
            onClick={() => setIsBuyer(false)}
          >
            <p className={classes.ptext}>Seller</p>
          </div>
        </Col>
        <Col className="px-0">
          <div
            className={` ${classes.infobutton} ${buy}`}
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
      </Row>
    </Container>
  );
};

export default HomeGetStarted;
