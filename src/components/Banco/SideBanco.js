import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faDollarSign,
  faExchangeAlt,
  faGifts,
} from "@fortawesome/free-solid-svg-icons";

const SideBanco = () => {
  const { sideDisplay, windowWidth } = useSelector((state) => state.banco);

  const dispatch = useDispatch();
  return (
    <div
      className="col-xl-1 bancoSide"
      style={
        windowWidth >= 1204
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
          <div>
            <FontAwesomeIcon icon={faHome} />
          </div>
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
          <div>
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
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
          <div>
            <FontAwesomeIcon icon={faExchangeAlt} />
          </div>
          Action
        </button>
      </div>
      <div className="col">
        <LinkContainer to="/">
          <button className="btn pl-2">
            <div>
              <FontAwesomeIcon icon={faGifts} />
            </div>
            Oriental NFT
          </button>
        </LinkContainer>
      </div>
    </div>
  );
};

export default SideBanco;
