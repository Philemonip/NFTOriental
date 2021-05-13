import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

const TransactionHistory = () => {
  const { transaction, showTransactionHistory } = useSelector(
    (state) => state.banco
  );
  const dispatch = useDispatch();
  return showTransactionHistory ? (
    <div>
      <hr></hr>
      <button
        className="btn m-2 text-white"
        onClick={() => dispatch(bancoSliceActions.toggleTransactionHistory())}
      >
        <FontAwesomeIcon icon={faCoins} size="2x" />
        &nbsp; Show less
      </button>
      <h3 className="text-center savingsTitle">Transaction History</h3>
      <hr></hr>
      <div className="row mr-auto ml-auto">
        <div className="col-lg-6 col-md-3 d-flex justify-content-center align-items-center">
          <h5 className="savingsTitle">Accounts</h5>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <h5 className="savingsTitle">Amount</h5>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center ">
          <h5 className="savingsTitle">Category</h5>
        </div>
      </div>
      <hr style={{ backgroundColor: "white" }}></hr>
      {transaction.map((t, key) => (
        <div key={key} className="row">
          <div className="col-lg-6 col-md-12 justify-contents-center ">
            <div className="fromAddress">
              {t.from_address === "Banco" ? (
                <p className="savingsAccount">From: {t.from_address}</p>
              ) : (
                <p className="savingsAccount">From: {t.from_address}</p>
                // <p>{t.from_address.substr(0, 9)}...</p>
              )}
            </div>
            <div className=" toAddress">
              <p className="savingsAccount">To: {t.to_address}</p>
              {/* <p>{t.to_address.substr(0, 9)}...</p> */}
            </div>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <p>
              {t.amount / 1e18} &nbsp;
              {t.currency}
            </p>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <p>{t.category}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <button
      className="btn m-2 text-white"
      onClick={() => dispatch(bancoSliceActions.toggleTransactionHistory())}
    >
      <FontAwesomeIcon icon={faCoins} size="2x" />
      &nbsp; Show more
    </button>
  );
};

export default TransactionHistory;
