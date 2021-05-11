import Navi from "../components/Common/Navbar";
import { IoIosCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Jumbotron, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
// import { browseActions } from "../redux/Marketplace/browseSlice";
import axios from "axios";
import {
  //   nftSliceActions,
  getTransactionThunk,
  //   addNFTtransactionThunk,
  addmetadataThunk,
  updateItemThunk,
  deleteItemThunk,
  getNameThunk,
} from "../redux/NFT/nftSlice";
import {
  mintingSliceActions,
  uploadToImgurThunk,
  //   mintNFTThunk,
} from "../redux/Minting/mintingSlice";
import NFTtransactions from "../components/Profile/Transactions";
import Settings from "../components/Profile/Setting";
import Collectibles from "../components/Profile/Collectibles";
import CreatedNFT from "../components/Profile/CreatedNFT";
import Mint from "../components/Profile/Mint";
import LoadModal from "../components/Common/LoadModal";
import "./ProfilePage.css";
var web3;
var contractNFT;

function ProfilePage() {
  const { currentUser, etherscanLoad } = useSelector((state) => state.detail);
  //   const items = useSelector((state) => state.detail.items);
  // const contractNFT = useSelector((state) => state.detail.contract);
  const itemArrBackend = useSelector((state) => state.browse.itemArr);
  const userName = useSelector((state) => state.nft.name);
  const [itemArr, setItemArr] = useState(itemArrBackend);
  const [loginStatus, setLoginStatus] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const {
    file,
    price,
    name,
    category,
    image,
    externalUrl,
    description,
  } = useSelector((state) => state.mint);
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [profileContent, setProfileContent] = useState("Collectibles");
  const dispatch = useDispatch();
  // useEffect(async () => {
  //   await loadWeb3();
  //   await loadBlockchainData();
  // }, []);
  useEffect(() => {
    const metamaskCheck = async () => {
      //Declare loadBlockchain
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
          dispatch(getTransactionThunk(accounts[0]));
          dispatch(getNameThunk(accounts[0]));
        } else {
          window.alert("Please use correct network and refresh the page.");
        }
      };

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
        window.alert("Profile no login");
      }
    };
    metamaskCheck();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      let newItemArr = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/items/`
      );
      setItemArr(newItemArr.data);
    };
    fetchData();
  }, []);

  //   useEffect(async () => {
  //     const fetchData = async () => {
  //       const { data } = await axios.get(
  //         `${process.env.REACT_APP_API_SERVER}/items/`
  //       );
  //       dispatch(browseActions.getFiltered(data));
  //       console.log("data from marketbrowse useeffect");
  //       console.log(data);
  //     };
  //     fetchData();
  //   }, [dispatch]);

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert("Please login with Metamask.");
  //   }
  // };

  async function itemOnSale(tokenId, price) {
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods
        .tokenOnSale(tokenId, `${price * 1e18}`)
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
      dispatch(detailSliceActions.updateEtherscanLoad(false));
    } catch (err) {
      console.log("item on sale error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
    }
  }

  async function itemNotForSale(tokenId) {
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
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
      dispatch(detailSliceActions.updateEtherscanLoad(false));
    } catch (err) {
      console.log("item not for sale error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
    }
  }

  async function burnToken(tokenId) {
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods.burnToken(tokenId).send({ from: currentUser });
      const getItem = await contractNFT.methods.getAllItems().call();
      await dispatch(detailSliceActions.updateItem(getItem));
      await dispatch(
        deleteItemThunk({
          token_id: tokenId,
        })
      );
      dispatch(detailSliceActions.updateEtherscanLoad(false));
    } catch (err) {
      console.log("burning token error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
    }
  }

  const handleMintingSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods.mint(name).send({ from: currentUser });
      //etherscan
      const minting = await contractNFT.methods.getAllItems().call();
      await dispatch(detailSliceActions.updateItem(minting));
      const NFTitem = minting[minting.length - 1];
      const id = NFTitem.id;
      const bcName = NFTitem.itemName;
      const creator = NFTitem.creator;
      const owner = NFTitem.owner;
      // const price = NFTitem.price;
      const forSale = NFTitem.forSale;

      const data = new FormData();
      data.append("file", file);
      console.log(0);
      let imageUrl = await dispatch(uploadToImgurThunk(data));
      await dispatch(
        addmetadataThunk({
          token_id: id,
          name: bcName,
          creator,
          owner,
          on_sale: forSale,
          collection: "shoes",
          asset_id: "260156",
          image: imageUrl,
          externalUrl,
          description,
        })
      );

      dispatch(mintingSliceActions.postUploadCleanup());
      console.log(1);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      console.log(2);

      const newItemArr = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/items/`
      );
      setItemArr(newItemArr.data);
      setProfileContent("Created");
    } catch (err) {
      console.log("mint err", err);
      console.log(3);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      console.log(4);
    }
  };

  //   async function approveTo(buyer, tokenId) {
  //     try {
  //       await contractNFT.methods
  //         .approvalTo(buyer, tokenId)
  //         .send({ from: currentUser });
  //     } catch (err) {
  //       console.log("approving to buyer error", err);
  //     }
  //   }

  //   async function cancelApproval(tokenId) {
  //     try {
  //       await contractNFT.methods
  //         .cancelApproval(tokenId)
  //         .send({ from: currentUser });
  //     } catch (err) {
  //       console.log("cancel approval error", err);
  //     }
  //   }

  function copyWalletAdress() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1300);
  }

  return (
    <>
      <Navi />
      <Jumbotron className="jumbotronProfile mb-1 p-5">
        {loginStatus ? <h4>Hello, {userName}</h4> : <h4>Hello, Anumnumnus</h4>}

        <div xs={6} md={4} className="text-center">
          <Image
            className="profileImage"
            src={
              loginStatus
                ? "https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png"
                : "https://i02.appmifile.com/images/2019/07/27/1f0b9ee0-5117-4dac-89db-bd2972b1c7b4.jpg"
            }
          />
        </div>
      </Jumbotron>
      <div className="profileContent">
        <div className="text-center">
          <h4>{userName}</h4>
          <p>
            {currentUser}
            <CopyToClipboard text={currentUser} onCopy={copyWalletAdress}>
              <Button>
                <IoIosCopy />
              </Button>
            </CopyToClipboard>
            {isCopied ? <span style={{ color: "red" }}>Copied!</span> : null}
          </p>
          {/* <button className="mx-1" onClick={() => mint("item1")}>
						Mint stuff
					</button> */}
        </div>

        <div className="px-4 buttonForChange">
          <button
            className="mx-1"
            onClick={() => setProfileContent("Collectibles")}
          >
            Collectibles
          </button>
          <button className="mx-1" onClick={() => setProfileContent("Created")}>
            Created NFT
          </button>
          <button
            className="mx-1"
            onClick={() => setProfileContent("Transactions")}
          >
            Transactions
          </button>
          {loginStatus && (
            <>
              <button
                className="mx-1"
                onClick={() => setProfileContent("Settings")}
              >
                Settings
              </button>
              <button
                className="mx-1"
                onClick={() => setProfileContent("Mint")}
              >
                Mint
              </button>
            </>
          )}

          <hr></hr>
        </div>

        <div className="px-4">
          {profileContent === "Collectibles" ? (
            <Collectibles
              itemNotForSale={itemNotForSale}
              itemOnSale={itemOnSale}
              burnToken={burnToken}
              itemArr={itemArr}
            />
          ) : profileContent === "Created" ? (
            <CreatedNFT
              itemNotForSale={itemNotForSale}
              itemOnSale={itemOnSale}
              burnToken={burnToken}
              itemArr={itemArr}
            />
          ) : profileContent === "Transactions" ? (
            <NFTtransactions />
          ) : profileContent === "Settings" ? (
            <Settings />
          ) : (
            profileContent === "Mint" && (
              <Mint handleMintingSubmit={handleMintingSubmit} />
            )
          )}
        </div>
      </div>
      <LoadModal show={etherscanLoad} />
    </>
  );
}
export default ProfilePage;
