import Navi from "../components/Common/Navbar";
import { Jumbotron, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import {
    nftSliceActions,
    getTransactionThunk,
    addNFTtransactionThunk,
    addmetadataThunk,
    updateItemThunk,
    deleteItemThunk,
} from "../redux/NFT/nftSlice";
import NFTtransactions from "../components/Profile/Transactions";
import Settings from "../components/Profile/Setting";
import Collectibles from "../components/Profile/Collectibles";
import CreatedNFT from "../components/Profile/CreatedNFT";
import "./ProfilePage.css";

function ProfilePage() {
    const currentUser = useSelector((state) => state.detail.currentUser);
    const items = useSelector((state) => state.detail.items);
    const contractNFT = useSelector((state) => state.detail.contract);

    const [profileContent, setProfileContent] = useState("Collectibles");
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
            dispatch(getTransactionThunk(accounts[0]));
        } else {
            window.alert("Please use correct network and refresh the page.");
        }
    };

    async function itemOnSale(tokenId, price) {
        try {
            await contractNFT.methods
                .tokenOnSale(tokenId, price)
                .send({ from: currentUser });
            const getItem = await contractNFT.methods.getAllItems().call();
            await dispatch(detailSliceActions.updateItem(getItem));
            const NFTitem = getItem.filter(i => i.id === tokenId)
            const owner = NFTitem[0].owner
            const forSale = NFTitem[0].forSale

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
            const NFTitem = getItem.filter(i => i.id === tokenId)
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

    async function burnToken(tokenId) {
        try {
            await contractNFT.methods.burnToken(tokenId).send({ from: currentUser });
            const getItem = await contractNFT.methods.getAllItems().call();
            await dispatch(detailSliceActions.updateItem(getItem));
            await dispatch(
                deleteItemThunk({
                    token_id: tokenId,
                })
            );
        } catch (err) {
            console.log("burning token error", err);
        }
    }

    async function mint(itemName) {
        try {
            await contractNFT.methods.mint(itemName).send({ from: currentUser });
            const minting = await contractNFT.methods.getAllItems().call();
            await dispatch(detailSliceActions.updateItem(minting));
            const NFTitem = minting[minting.length - 1];
            const id = NFTitem.id
            const name = NFTitem.itemName
            const creator = NFTitem.creator
            const owner = NFTitem.owner
            const price = NFTitem.price
            const forSale = NFTitem.forSale

            await dispatch(
                addmetadataThunk({
                    token_id: id,
                    name: name,
                    creator: creator,
                    owner: owner,
                    on_sale: forSale,
                    current_price: price,
                    collection: "shoes",
                    asset_id: "260156",
                    image: "https://sportshub.cbsistatic.com/i/r/2021/05/03/7c612065-314a-464b-b09c-e92777922087/thumbnail/1200x675/497827ef3c95b75e6c8b2235bf297cf9/lebron-james.jpg",
                    description: "lebron",
                    external_url: "cryptopunk.com",
                })
            )
        } catch (err) {
            console.log("minting error", err);
        }
    }

    async function approveTo(buyer, tokenId) {
        try {
            await contractNFT.methods
                .approvalTo(buyer, tokenId)
                .send({ from: currentUser });
        } catch (err) {
            console.log("approving to buyer error", err);
        }
    }

    async function cancelApproval(tokenId) {
        try {
            await contractNFT.methods
                .cancelApproval(tokenId)
                .send({ from: currentUser });
        } catch (err) {
            console.log("cancel approval error", err);
        }
    }

    return (
        <>
            <Navi />
            <Jumbotron className="jumbotron mb-1 p-5">
                <h4>Hello, Name </h4>
                <div xs={6} md={4} className="text-center">
                    <Image className="profileImage" src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png"
                    />
                </div>
            </Jumbotron>
            <div className="profileContent">
                <div className="text-center">
                    <h4>Name</h4>
                    <p>{currentUser}</p>
                    <button className="mx-1" onClick={() => mint('item1')}>Mint stuff</button>
                </div>

                <div className="px-4 buttonForChange">
                    <button className="mx-1" onClick={() => setProfileContent("Collectibles")}>Collectibles</button>
                    <button className="mx-1" onClick={() => setProfileContent("Created")}>Created NFT</button>
                    <button className="mx-1" onClick={() => setProfileContent("Transactions")}>Transactions</button>
                    <button className="mx-1" onClick={() => setProfileContent("Settings")}>Settings</button>
                    <hr></hr>
                </div>

                <div className="px-4">
                    {profileContent === "Collectibles" ?
                        <Collectibles
                            itemNotForSale={itemNotForSale}
                            itemOnSale={itemOnSale}
                            burnToken={burnToken}
                        /> :
                        profileContent === "Created" ?
                            <CreatedNFT
                                itemNotForSale={itemNotForSale}
                                itemOnSale={itemOnSale}
                                burnToken={burnToken}
                            /> :
                            profileContent === "Transactions" ?
                                <NFTtransactions /> :
                                profileContent === "Settings" ?
                                    <Settings /> :
                                    <p>hi</p>
                    }
                </div>
            </div>
        </>
    )
}

export default ProfilePage;
