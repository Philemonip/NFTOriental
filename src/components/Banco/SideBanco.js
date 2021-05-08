import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
const SideBanco = () => {
  const { sideDisplay, windowWidth } = useSelector((state) => state.banco);

  const dispatch = useDispatch();
  return (
    <div
      className="col-md-2 bancoSide text-left"
      style={
        windowWidth >= 767
          ? { display: "block" }
          : sideDisplay
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="col ">
        <button
          className="btn"
          onClick={() => dispatch(bancoSliceActions.changeBancoContent("Home"))}
        >
          Home
        </button>
      </div>
      <div className="col">
        <button
          className="btn"
          onClick={() =>
            dispatch(bancoSliceActions.changeBancoContent("Profile"))
          }
        >
          Profile
        </button>
      </div>
      <div className="col">
        <button
          className="btn"
          onClick={() =>
            dispatch(bancoSliceActions.changeBancoContent("Action"))
          }
        >
          Action
        </button>
      </div>
      <div className="col">
        <LinkContainer to="/">
          <button className="btn">Closesea</button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default SideBanco;
