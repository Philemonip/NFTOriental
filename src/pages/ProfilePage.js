import { IoMdCopy } from "react-icons/io";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Jumbotron, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import axios from "axios";
import {
  getTransactionThunk,
  addmetadataThunk,
  updateItemThunk,
  deleteItemThunk,
  getNameThunk,
} from "../redux/NFT/nftSlice";
import {
  mintingSliceActions,
  uploadToImgurThunk,
} from "../redux/Minting/mintingSlice";
import Navi from "../components/Common/Navbar";
import NFTtransactions from "../components/Profile/Transactions";
import Settings from "../components/Profile/Setting";
import Collectibles from "../components/Profile/Collectibles";
import CreatedNFT from "../components/Profile/CreatedNFT";
import Mint from "../components/Profile/Mint";
import LoadModal from "../components/Common/LoadModal";
import ProfilePicSwitch from "../components/Common/ProfilePicSwitch";
import "./ProfilePage.css";
var web3;
var contractNFT;

function ProfilePage() {
  const { currentUser, etherscanLoad } = useSelector((state) => state.detail);
  const itemArrBackend = useSelector((state) => state.browse.itemArr);
  const userName = useSelector((state) => state.nft.name);
  const [itemArr, setItemArr] = useState(itemArrBackend);
  const [loginStatus, setLoginStatus] = useState(true);
  const [isCopied, setCopied] = useState(false);
  const { file, name, collection, externalUrl, description } = useSelector(
    (state) => state.mint
  );
  const [profileContent, setProfileContent] = useState("Collectibles");
  const dispatch = useDispatch();

  useEffect(() => {
    const metamaskCheck = async () => {
      //Declare loadBlockchain
      const loadBlockchainData = async () => {
        web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        // dispatch(detailSliceActions.updateWeb3(web3));
        dispatch(detailSliceActions.updateCurrentUser(accounts[0]));
        // console.log("current user:", accounts[0]);

        //load contract
        const networkData = CloseSeaNFT.networks[networkId];

        if (networkData) {
          const abi = CloseSeaNFT.abi;
          const address = networkData.address;
          contractNFT = new web3.eth.Contract(abi, address);
          // dispatch(detailSliceActions.updateContract(contract));
          const getItem = await contractNFT.methods.getAllItems().call();
          dispatch(detailSliceActions.updateItem(getItem));
          // console.log(getItem);
          dispatch(getTransactionThunk(accounts[0]));
          dispatch(getNameThunk(accounts[0]));
        } else {
          setLoginStatus(false);
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

  async function itemOnSale(tokenId, price) {
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods
        .tokenOnSale(tokenId, `${price * 1e18}`)
        .send({ from: currentUser })
        .on("transactionHash", function (hash) {
          // console.log("hash on(transactionHash nft " + hash);
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
          // console.log("hash on(transactionHash nft " + hash);
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
    } catch (err) {
      console.log("item not for sale error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
    }
  }

  async function burnToken(tokenId) {
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await contractNFT.methods
        .burnToken(tokenId)
        .send({ from: currentUser })
        .on("transactionHash", function (hash) {
          // console.log("hash on(transactionHash nft " + hash);
          dispatch(detailSliceActions.updateNftHash(hash));
        });
      const getItem = await contractNFT.methods.getAllItems().call();
      await dispatch(detailSliceActions.updateItem(getItem));
      await dispatch(
        deleteItemThunk({
          token_id: tokenId,
        })
      );
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
    } catch (err) {
      console.log("burning token error", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
    }
  }

  const handleMintingSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(detailSliceActions.updateEtherscanLoad(true));

      const data = new FormData();
      data.append("file", file);
      await dispatch(uploadToImgurThunk(data)).then(async (imageUrl) => {
        if (imageUrl) {
          await contractNFT.methods
            .mint(name)
            .send({ from: currentUser })
            .on("transactionHash", function (hash) {
              // console.log("hash on(transactionHash nft " + hash);
              dispatch(detailSliceActions.updateNftHash(hash));
            });
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
          await dispatch(
            addmetadataThunk({
              token_id: id,
              name: bcName,
              creator,
              owner,
              on_sale: forSale,
              collection,
              asset_id: "260156",
              image: imageUrl,
              externalUrl,
              description,
            })
          );
        } else {
          dispatch(detailSliceActions.updateEtherscanLoad(false));
          window.alert("image not good");
        }
      });

      dispatch(mintingSliceActions.postUploadCleanup());

      const newItemArr = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/items/`
      );
      setItemArr(newItemArr.data);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
      setProfileContent("Created");
    } catch (err) {
      console.log("mint err", err);
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateNftHash(null));
    }
  };

  function copyWalletAdress() {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 800);
  }

  //Address shortener
  // function shortAddress(address) {
  //   return address.toString(16).substring(0, 6);
  // }

  return (
    <>
      <Navi />
      {!loginStatus ? (
        <Redirect to="/" />
      ) : (
        <div className="profile">
          <Jumbotron className="jumbotronProfile mb-1 pb-3 pt-5">
            <div xs={6} md={4} className="text-center">
              <ProfilePicSwitch address={currentUser} />
              <div className="text-center UserClipboard">
                <h4 className="font-weight-bold mt-3">{userName}</h4>
                {/* Apply shortened address here */}
                <span className="mx-2">{currentUser}</span>
                <CopyToClipboard text={currentUser} onCopy={copyWalletAdress}>
                  <button className="btn">
                    <IoMdCopy size={20} />
                  </button>
                </CopyToClipboard>
                {isCopied && (
                  <span className="mx-2" style={{ color: "grey" }}>
                    Copied!
                  </span>
                )}
                {/* <button className="mx-1" onClick={() => mint("item1")}>
						Mint stuff
					</button> */}
              </div>
            </div>
          </Jumbotron>
          <div className="profileContent">
            <div className="px-4 buttonForChange">
              {/* <button
              className="mx-1"
              onClick={() => setProfileContent("Collectibles")}
            >
              Collectibles
            </button>
            <button
              className="mx-1"
              onClick={() => setProfileContent("Created")}
            >
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
                  Create NFT
                </button>
              </>
            )} */}

              <Nav
                variant="tabs"
                defaultActiveKey="Collectibles"
                className="profile_navtabs"
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="Collectibles"
                    onSelect={() => setProfileContent("Collectibles")}
                  >
                    Collectibles
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Created"
                    onSelect={() => setProfileContent("Created")}
                  >
                    Created
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Transactions"
                    onSelect={() => setProfileContent("Transactions")}
                  >
                    Transactions
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Settings"
                    onSelect={() => setProfileContent("Settings")}
                  >
                    Settings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="Mint"
                    onSelect={() => setProfileContent("Mint")}
                  >
                    Create NFT
                  </Nav.Link>
                </Nav.Item>
              </Nav>
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
        </div>
      )}
    </>
  );
}
export default ProfilePage;
