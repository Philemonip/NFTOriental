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
        <h3 className="font-weight-bold">Savings Account : </h3>
        <h4>{account}</h4>
      </div>
      <hr></hr>
      <div className="container-fluid profileAsset">
        <h3 className="font-weight-bold">Asset :</h3>
        <div className="row">
          <div className="col">
            <h5>Available ETH :</h5>
            <h3>{ethBalance}</h3>
          </div>
          <div className="col">
            <h5>Available CCH : </h5>
            <h3>{cchBalance}</h3>
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
