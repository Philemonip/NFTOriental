import Navi from "../components/Common/Navbar";
import logo from "../asset/hedge.png";
import "../App.css";

function MarketHome() {
  return (
    <div className="App">
      <Navi />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are in Marketplace</p>
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

export default MarketHome;
