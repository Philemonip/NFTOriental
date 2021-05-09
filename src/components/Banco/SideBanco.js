import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
import 'font-awesome/css/font-awesome.min.css';

const SideBanco = () => {
  const { sideDisplay, windowWidth } = useSelector((state) => state.banco);


  const dispatch = useDispatch();
  return (
    <div
      className="col-md-1 bancoSide text-left"
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
          className="btn-info"
          onClick={() => dispatch(bancoSliceActions.changeBancoContent("Home"))}
        >
          <div><i className="fa fa-home"></i>
          </div>
          Home

        </button>



      </div>
      <div className="col">
        <button
          className="btn-danger"
          onClick={() =>
            dispatch(bancoSliceActions.changeBancoContent("Profile"))
          }
        >

          Profile
        </button>
      </div>
      <div className="col">
        <button
          className="btn-success"
          onClick={() =>
            dispatch(bancoSliceActions.changeBancoContent("Action"))
          }
        >
          <div><i className="fa fa-hand-holding-usd"></i></div>
          <i className="fa fa-exchange-alt"></i>
          Action
        </button>
      </div>
      <div className="col">
        <LinkContainer to="/">
          <button className="btn-warning">Closesea</button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default SideBanco;
