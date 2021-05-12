import { useSelector } from "react-redux";
import Loading from "./Loading";
import TransactionHistory from "./TransactionHistory";

const ProfileOfBanco = () => {
  const { account, ethBalance, cchBalance, loadingTransaction } = useSelector(
    (state) => state.banco
  );
  return (
    <div className="col text-left bancoProfile">
      <div className="container-fluid profileAccount py-2">
        <h4 className="font-weight-bold savingsTitle">Savings Account : </h4>
        <h5 className="savingsAccount">{account}</h5>
      </div>
      <hr></hr>
      <div className="container-fluid profileAsset">
        <h4 className="font-weight-bold savingsTitle">Asset :</h4>
        <div className="row">
          <div className="col-lg-6 col-md-3">
            <h5 className="savingsTitle">Available ETH :</h5>
            <h4>{ethBalance}</h4>
          </div>
          <div className="col-lg-6 col-md-3">
            <h5 className="savingsTitle">Available CCH : </h5>
            <h4>{cchBalance}</h4>
          </div>
        </div>
      </div>
      {
        loadingTransaction ? (
          <Loading />
        ) : (
          <div className="mr-auto ml-auto transactionHistory">
            <TransactionHistory />
          </div>
        )
      }
    </div >
  );
};

export default ProfileOfBanco;
