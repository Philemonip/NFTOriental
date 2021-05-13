import Web3 from "web3";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import CloseSeaNFT from "../abi/CloseSeaNFT.json";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
var web3;
var contractNFT;

function AdminPage() {
  const { currentUser } = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const [tokenID, settokenID] = useState("")

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
        } else {
          window.alert("Please use correct network and refresh the page.");
        }
      };

      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        await loadBlockchainData();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        await loadBlockchainData();
      } else {
        window.alert("Profile no login");
      }
    };
    metamaskCheck();
  }, [dispatch]);

  async function burnToken(tokenId) {
    try {
      await contractNFT.methods
        .burnToken(tokenId)
        .send({ from: currentUser })
        .on("transactionHash", function (hash) {
          console.log("hash on(transactionHash nft " + hash);
          dispatch(detailSliceActions.updateNftHash(hash));
        });
      const getItem = await contractNFT.methods.getAllItems().call();
      await dispatch(detailSliceActions.updateItem(getItem));
    } catch (err) {
      console.log("burning token error", err);
    }
  }

  return (
    <div className="text-center" style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          burnToken(tokenID)
          settokenID("")
        }}
      >
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Token Id"
            value={tokenID}
            onChange={(e) => { settokenID(e.target.value) }}
            required />
          <button className="btn btn-primary m-3" type="submit">Burn Token</button>
        </Form.Group>
      </Form>
    </div >
  )
};

export default AdminPage;

