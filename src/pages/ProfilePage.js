import Navi from "../components/Common/Navbar";
import { Jumbotron, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";

import NFTtransactions from "../components/Profile/Transactions";
import Settings from "../components/Profile/Setting";
import Collectibles from "../components/Profile/Collectibles";


function ProfilePage() {
    const currentUser = useSelector((state) => state.detail.currentUser);
    const items = useSelector((state) => state.detail.items);
    const contractNFT = useSelector((state) => state.detail.contract);

    const [profileContent, setProfileContent] = useState("Collectibles")
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
            window.alert("Please login with Metamask!");
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
            // const getToken = await contract.methods.getToken(0).call();
            // dispatch(detailSliceActions.updateToken(getToken))
        } else {
            window.alert("Smart contract not deployed to detected network.");
        }
    };

    async function itemOnSale(tokenId, price) {
        console.log("item on sale");
        try {
            await contractNFT.methods
                .tokenOnSale(tokenId, price)
                .send({ from: currentUser });
        } catch (err) {
            console.log("item on sale error", err);
        }
    }

    async function itemNotForSale(tokenId) {
        try {
            await contractNFT.methods.notForSale(tokenId).send({ from: currentUser });
        } catch (err) {
            console.log("item not for sale error", err);
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
            await contractNFT.methods.cancelApproval(tokenId).send({ from: currentUser });
        } catch (err) {
            console.log("cancel approval error", err);
        }
    }

    async function burnToken(tokenId) {
        try {
            await contractNFT.methods.burnToken(tokenId).send({ from: currentUser });
        } catch (err) {
            console.log("burning token error", err);
        }
    }

    return (
        <>
            <Navi />
            <Jumbotron className="mb-1 p-5">
                <h4>Hello, Name </h4>
                <div xs={6} md={4} className="text-center">
                    <Image src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png" roundedCircle />
                </div>
            </Jumbotron>
            <div>
                <div className="text-center">
                    <h2>Name</h2>
                    <p>{currentUser}</p>
                </div>

                {/* <div className="row">
                    {profileContent === "NFTtransactions" ? (
                        <NFTtransactions />
                    ) : profileContent === "Settings" ? (
                        <p>setting</p>
                    ) : (
                        <Collectibles />
                    )}
                </div> */}

                <div>
                    <button onClick={() => setProfileContent("Collectibles")}>Collectibles</button>
                    <button onClick={() => setProfileContent("")}>Transactions</button>
                    <button>Settings</button>
                </div>

                <div>
                    {profileContent === "Collectibles" ?
                        <Collectibles
                            itemNotForSale={itemNotForSale}
                            itemOnSale={itemOnSale}
                            burnToken={burnToken}
                        /> :
                        <p>hi</p>
                    }
                </div>

            </div>
        </>

    )
}

export default ProfilePage;