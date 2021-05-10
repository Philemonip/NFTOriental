import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const NavBanco = () => {
  const { windowWidth, sideDisplay } = useSelector((state) => state.banco);
  const dispatch = useDispatch();
  return (
    <div className="container-fluid bancoNav d-flex justify-content-between">
      <div className="logo d-flex">
        <div class="scene">
          <div class="cube">
            <div class="cube__face cube__face--front"></div>
            <div class="cube__face cube__face--back"></div>
            <div class="cube__face cube__face--right"></div>
            <div class="cube__face cube__face--left"></div>
            <div class="cube__face cube__face--top"></div>
            <div class="cube__face cube__face--bottom"></div>
          </div>
        </div>
        <div className="bancoTitle text-left d-flex align-items-center mx-2">
          {windowWidth >= 767 ? <h2>Banco de Cinco Chicos</h2> : <h2>BCC</h2>}
        </div>
      </div>
      <div className="bancoNavToggle">
        <button className="btn btn-dark"
          onClick={() => {
            dispatch(bancoSliceActions.sideDisplay(!sideDisplay));
          }}
        >
          <div><FontAwesomeIcon icon={faBars} /></div>
        </button>
      </div>
    </div>
  );
};

export default NavBanco;
