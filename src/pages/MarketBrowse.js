import Navi from "../components/navbar";
import logo from "../asset/hedge.png";
import "../App.css";

function MarketBrowse() {
  return (
    <div className="App">
      <Navi />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are in ItemBrowse</p>
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

export default MarketBrowse;
