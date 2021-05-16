// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";

const DepositOfBanco = ({ deposit }) => {
  const { depositAmount, isDeposited } = useSelector((state) => state.banco);
  const dispatch = useDispatch();

  return (
    <div>
      {isDeposited ? (
        <div>youve already made a deposit</div>
      ) : (
        <div className="bancoDeposit">
          <h5 className="pt-4">Earn CCH interest by depositing your ETH.</h5>
          <div className="text-left mx-4">
            <br></br>
            1. Make ONE deposit at a time.
            <br></br>
            2. CCH Interest grows with deposit time.
            <br></br>
            3. Withdraw ETH with CCH interest to buy NFTs at OrientalNFT!
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let amount = depositAmount;
              amount = amount * 10 ** 18; //convert to wei
              deposit(amount);
              dispatch(bancoSliceActions.updateDepositAmount(0));
            }}
            className="p-4"
          >
            <div className="form-group px-3">
              <br></br>
              <p>Deposit Amount (ETH):</p>
              <input
                id="depositAmount"
                step="0.01"
                type="number"
                value={depositAmount}
                onChange={(e) =>
                  dispatch(
                    bancoSliceActions.updateDepositAmount(e.target.value)
                  )
                }
                className="form-control form-control-md"
                placeholder="amount..."
                required
              />
              <p className="text-right minimum">*Min. Amount is 0.01 ETH</p>
            </div>
            <button type="submit" className="btn btn-success mt-2 px-4">
              DEPOSIT
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepositOfBanco;
