import { useSelector, useDispatch } from "react-redux";
import { bancoSliceActions } from "../../redux/Banco/bancoSlice";

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
        <div className="bancoTitle text-left d-flex align-items-center">
          {windowWidth >= 767 ? <h1>banco de cinco chicos</h1> : <h1>BdeCC</h1>}
        </div>
      </div>
      <div className="bancoNavToggle">
        <button
          onClick={() => {
            dispatch(bancoSliceActions.sideDisplay(!sideDisplay));
          }}
        >
          三
        </button>
      </div>
    </div>
  );
};

export default NavBanco;
