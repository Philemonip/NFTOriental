import React from "react";
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
        <div>
          <br></br>
          How much do you want to deposit?
          <br></br>
          More and longer you deposit
          <br></br>
          more interest you get as CCH!
          <br></br>
          min. amount is 0.01 ETH
          <br></br>
          you can only make 1 deposit at a time
          <br></br>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let amount = depositAmount;
              amount = amount * 10 ** 18; //convert to wei
              deposit(amount);
              dispatch(bancoSliceActions.updateDepositAmount(0));
            }}
          >
            <div className="form-group mr-sm-2">
              <br></br>
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
            </div>
            <button type="submit" className="btn btn-primary">
              DEPOSIT
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DepositOfBanco;
