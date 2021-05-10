import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
const TransferCCHOfBanco = ({ transferCCH }) => {
  const { targetAccount, transferAmount } = useSelector((state) => state.banco);
  const dispatch = useDispatch();
  return (
    <div>

      <h4 className="pt-5 mx-5"> Transfer CCH to other addresses</h4>

      <br></br>
      <div className="TransferCCH">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let amount = transferAmount;
            amount = amount * 10 ** 18; //convert to wei
            transferCCH(targetAccount, amount);
          }}
        >
          <div className="form-group px-4">
            <h6 className="text-left"> &nbsp;Recipient Address</h6>
            <input
              id="targetAddress"
              type="text"
              value={targetAccount}
              onChange={(e) =>
                dispatch(bancoSliceActions.updateTargetAccount(e.target.value))
              }
              className="form-control form-control-md"
              placeholder="Target account"
              required
            />
          </div>
          <div className="form-group px-4">
            <h6 className="text-left">&nbsp;CCH:</h6>

            <input
              id="transferAmount"
              step="0.01"
              type="number"
              value={transferAmount}
              onChange={(e) =>
                dispatch(bancoSliceActions.updateTransferAmount(e.target.value))
              }
              className="form-control form-control-md"
              placeholder="amount..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary px-4 my-4">
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransferCCHOfBanco;
