import { useParams } from "react-router-dom";
import Navi from "../components/navbar";
import logo from "../asset/hedge.png";
import "../App.css";

function MarketDetail() {
  const params = useParams();

  return (
    <div className="App">
      <Navi />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {params.itemAddress && (
          <p>You are in ItemDetail, address: {params.itemAddress}</p>
        )}
        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=EnDg65ISswg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Me
        </a>
      </header>
    </div>
  );
}

export default MarketDetail;
