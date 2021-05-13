import Banco from "../abi/banco.json";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import Token from "../abi/Token.json";
import Web3 from "web3";
import {
  bancoSliceActions,
  getTransactionThunk,
  addTransactionThunk,
} from "../redux/Banco/bancoSlice";
import { detailSliceActions } from "../redux/Marketplace/detailSlice";
import ActionOfBanco from "../components/Banco/ActionOfBanco";
import Loading from "../components/Banco/Loading";
import "./BancoHome.css";
import ProfileOfBanco from "../components/Banco/ProfileOfBanco";
import NavBanco from "../components/Banco/NavBanco";
import SideBanco from "../components/Banco/SideBanco";
import ContentOfBanco from "../components/Banco/ContentOfBanco";
import LoadModal from "../components/Common/LoadModal";
var web3;
var token;
var banco;

const BancoHome = () => {
  const { account, loading, bancoContent } = useSelector(
    (state) => state.banco
  );
  const [loginStatus, setLoginStatus] = useState(true);
  const etherscanLoad = useSelector((state) => state.detail.etherscanLoad);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadBlockchainData = async () => {
      dispatch(bancoSliceActions.toggleLoading(true));
      if (typeof window.ethereum !== "undefined") {
        setLoginStatus(true);
        web3 = new Web3(window.ethereum);
        const netId = await web3.eth.net.getId();
        const accounts = await web3.eth.getAccounts();
        if (typeof accounts[0] !== "undefined") {
          const ethBalanceInWei = await web3.eth.getBalance(accounts[0]);
          dispatch(bancoSliceActions.updateAccount(accounts[0]));
          dispatch(
            bancoSliceActions.updateEthBalance(
              web3.utils.fromWei(ethBalanceInWei)
            )
          );
        } else {
          dispatch(bancoSliceActions.toggleLoading(false));
          window.alert("Please login with MetaMask");
          setLoginStatus(false);
        }

        //load contracts
        try {
          token = new web3.eth.Contract(
            Token.abi,
            Token.networks[netId].address
          );
          banco = new web3.eth.Contract(
            Banco.abi,
            Banco.networks[netId].address
          );
          // dispatch(bancoSliceActions.updateToken(token));
          // dispatch(bancoSliceActions.updateBanco(banco));
          const cchBalanceInWei = await token.methods
            .balanceOf(accounts[0])
            .call();
          dispatch(
            bancoSliceActions.updateCchBalance(
              web3.utils.fromWei(`${cchBalanceInWei}`)
            )
          );
          dispatch(bancoSliceActions.toggleLoading(false));
          dispatch(getTransactionThunk(accounts[0]));
          dispatch(bancoSliceActions.toggleTransactionLoading(false));
        } catch (e) {
          console.log("Error", e);
          dispatch(bancoSliceActions.toggleLoading(false));
          setLoginStatus(false);
          window.alert("Contracts not deployed to the current network");
        }
      } else {
        dispatch(bancoSliceActions.toggleLoading(false));
        window.alert("Please install MetaMask");
        setLoginStatus(false);
      }
    };
    loadBlockchainData();
  }, [dispatch, account]);

  useEffect(() => {
    function handleResize() {
      dispatch(bancoSliceActions.resizeWindowWidth(window.innerWidth));
      window.innerWidth >= 1204
        ? dispatch(bancoSliceActions.sideDisplay(true))
        : dispatch(bancoSliceActions.sideDisplay(false));
    }
    window.addEventListener("resize", handleResize);
  }, [dispatch]);

  async function deposit(amount) {
    if (banco !== "undefined") {
      try {
        dispatch(detailSliceActions.updateEtherscanLoad(true));
        await banco.methods
          .deposit()
          .send({ value: amount.toString(), from: account })
          .on("transactionHash", function (hash) {
            console.log("hash on(transactionHash eth " + hash);
            dispatch(detailSliceActions.updateEthHash(hash));
          });
        await showBalance();
        dispatch(detailSliceActions.updateEtherscanLoad(false));
        dispatch(detailSliceActions.updateEthHash(null));
      } catch (e) {
        dispatch(detailSliceActions.updateEtherscanLoad(false));
        dispatch(detailSliceActions.updateEthHash(null));
        console.log("Error, deposit: ", e);
      }
    }
  }
  async function withdraw(e) {
    e.preventDefault();
    if (banco !== "undefined") {
      try {
        //get ac, cch from bkend before
        dispatch(detailSliceActions.updateEtherscanLoad(true));
        const cchBalanceInWeiBefore = await token.methods
          .balanceOf(account)
          .call();
        await banco.methods
          .withdraw()
          .send({ from: account })
          .on("transactionHash", function (hash) {
            console.log("hash on(transactionHash eth " + hash);
            dispatch(detailSliceActions.updateEthHash(hash));
          });
        await showBalance();
        const cchBalanceInWeiAfter = await token.methods
          .balanceOf(account)
          .call();
        const amount = cchBalanceInWeiAfter - cchBalanceInWeiBefore;
        await console.log("amount", amount);
        //after -before = diff to bkend
        await dispatch(
          addTransactionThunk({
            fromAddress: "Banco",
            toAddress: account,
            amount: `${amount}`,
            category: "Interest",
            currency: "CCH",
          })
        );
        dispatch(bancoSliceActions.toggleTransactionLoading(true));
        await dispatch(getTransactionThunk(account));
        dispatch(bancoSliceActions.toggleTransactionLoading(false));
        dispatch(detailSliceActions.updateEtherscanLoad(false));
        dispatch(detailSliceActions.updateEthHash(null));
      } catch (e) {
        console.log("Error, withdraw: ", e);
        dispatch(bancoSliceActions.toggleTransactionLoading(false));
        dispatch(detailSliceActions.updateEtherscanLoad(false));
        dispatch(detailSliceActions.updateEthHash(null));
      }
    }
  }
  async function showBalance() {
    const ethBalanceInWei = await web3.eth.getBalance(account);
    dispatch(
      bancoSliceActions.updateEthBalance(web3.utils.fromWei(ethBalanceInWei))
    );
    const cchBalanceInWei = await token.methods.balanceOf(account).call();
    dispatch(
      bancoSliceActions.updateCchBalance(web3.utils.fromWei(cchBalanceInWei))
    );
  }

  const transferCCH = async (targetAccount, amount) => {
    //current cch balance/ac from to to bkend
    const cchBalanceInWeiBefore = await token.methods.balanceOf(account).call();
    if (cchBalanceInWeiBefore > amount) {
      dispatch(detailSliceActions.updateEtherscanLoad(true));
      await token.methods
        .transfer(targetAccount, `${amount}`)
        .send({ from: account })
        .on("transactionHash", function (hash) {
          console.log("hash on(transactionHash cch " + hash);
          dispatch(detailSliceActions.updateCchHash(hash));
        });
      await dispatch(
        addTransactionThunk({
          fromAddress: account,
          toAddress: targetAccount,
          amount: `${amount}`,
          category: "Transfer",
          currency: "CCH",
        })
      );
      dispatch(bancoSliceActions.toggleTransactionLoading(true));
      await dispatch(getTransactionThunk(account));
      dispatch(bancoSliceActions.toggleTransactionLoading(false));
      await showBalance();
      dispatch(detailSliceActions.updateEtherscanLoad(false));
      dispatch(detailSliceActions.updateCchHash(null));
      //current cch balance/ac ac from to to bkend cat = transfer
    }
  };

  return (
    <>
      {loginStatus ? (
        <div>
          <div className="cchHome">
            {loading ? (
              <Loading />
            ) : (
              <div className="BancoLanding">
                <div className="container-fluid text-center">
                  <NavBanco />
                  <div className="row bancoMain">
                    <SideBanco />
                    <div className="col-xl-11">
                      <div className="row">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <LoadModal show={etherscanLoad} />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default BancoHome;
