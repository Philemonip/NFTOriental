import Navi from "../components/Common/Navbar";
import HomeNewlyMinted from "../components/Marketplace/HomeNewlyMinted";
import classes from "./MarketHome.module.css";
import "../App.css";

function MarketHome() {
  return (
    <>
      <Navi />
      {/* <Trending Collection /> */}
      {/* <Maybe a Carousel /> */}
      {/* SOME CARD */}
      <div className={classes.markethome}>
        <div className={classes.title}>
          <h5>Trending Items</h5>
        </div>
        {/* <Trending Items /> */}
        <HomeNewlyMinted />
        <div className={classes.title}>
          <h5>Newly Minted</h5>
        </div>
        {/* <Newly Minted /> */}
        <HomeNewlyMinted />
      </div>
    </>
  );
}

export default MarketHome;
