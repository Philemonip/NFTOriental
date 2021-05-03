import Navi from "../components/Common/Navbar";
import { Jumbotron, Button, Image, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";

function ProfilePage() {
    const currentUser = useSelector((state) => state.detail.currentUser);
    const items = useSelector((state) => state.detail.items);
    const contractNFT = useSelector((state) => state.detail.contract);

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

    //admin page
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

    //admin page
    async function itemNotForSale(tokenId) {
        try {
            await contractNFT.methods.notForSale(tokenId).send({ from: currentUser });
        } catch (err) {
            console.log("item not for sale error", err);
        }
    }

    //admin page
    async function approveTo(buyer, tokenId) {
        try {
            await contractNFT.methods
                .approvalTo(buyer, tokenId)
                .send({ from: currentUser });
        } catch (err) {
            console.log("approving to buyer error", err);
        }
    }

    //admin page
    async function cancelApproval(tokenId) {
        try {
            await contractNFT.methods.cancelApproval(tokenId).send({ from: currentUser });
        } catch (err) {
            console.log("cancel approval error", err);
        }
    }

    //admin page
    async function burnToken(tokenId) {
        try {
            await contractNFT.methods.burnToken(tokenId).send({ from: currentUser });
        } catch (err) {
            console.log("burning token error", err);
        }
    }

    let ownedArr

    const ownerItems = (items, currentUser) => {
        ownedArr = items.filter((i) => i.owner === currentUser)
        console.log('this owner owns', ownedArr)
    }
    ownerItems(items, currentUser)

    return (
        <>
            <Navi />
            <Jumbotron>
                <h1>Hello, {currentUser} </h1>
                <Col xs={6} md={4}>
                    <Image src="https://cdn.vox-cdn.com/thumbor/ypiSSPbwKx2XUYeKPJOlW0E89ZM=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/7812969/nick_young_confused_face_300x256_nqlyaa.png" roundedCircle />
                </Col>
            </Jumbotron>
            <div>
                {/* <div className="row">
                    {bancoContent === "Home" ? (
                        <ContentOfBanco />
                    ) : bancoContent === "Profile" ? (
                        <ProfileOfBanco />
                    ) : (
                        <ActionOfBanco
                            deposit={deposit}
                            withdraw={withdraw}
                            transferCCH={transferCCH}
                        />
                    )}
                </div> */}




                <p>Address {currentUser}</p>
                <p>Edit Profile / Sharelink</p>

                <p>Collectibles</p>
                {ownedArr &&
                    ownedArr.map((item, index) => {
                        return (
                            <Col className="mt-4 d-flex" key={index}>
                                {/* <BrowseItemCard item={item} /> */}
                                <div>
                                    <h6>Name: {item.itemName}</h6>
                                    <h6>Id: {item.id}</h6>
                                    <h6>Owner: {item.owner}</h6>
                                    <h6>Creator: {item.creator}</h6>
                                    <h6>On Sale? {item.forSale}</h6>
                                    <h6>Price {item.price}</h6>
                                    {/* Only Creator functions */}
                                    {item.owner === item.creator ?
                                        <div>
                                            {item.forSale === true ?
                                                <Button variant="warning" onClick={(e) => itemNotForSale(item.id)}>Not for Sale</Button> :
                                                <Button variant="success" onClick={(e) => itemOnSale(item.id, 20)}>List on Sale</Button>
                                            }
                                            <Button variant="success">Approve</Button>
                                            <Button variant="warning">Cancel Approve</Button>
                                            <Button variant="danger" onClick={(e) => burnToken(item.id)}>Burn Token</Button>
                                        </div>
                                        :
                                        <div>
                                            <Button variant="success" onClick={(e) => itemOnSale(item.id, 20)}>List on Sale</Button>
                                            <Button variant="warning" onClick={(e) => itemNotForSale(item.id)}>Not for Sale</Button>
                                            <Button variant="success">Approve</Button>
                                            <Button variant="warning">Cancel Approve</Button>
                                        </div>
                                    }
                                </div>
                            </Col>
                        );
                    })}

                <p>Activity / Transactions</p>

            </div>
        </>

    )
}

export default ProfilePage;