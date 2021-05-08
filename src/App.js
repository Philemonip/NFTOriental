import "./App.css";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import MarketHome from "./pages/MarketHome";
import MarketBrowse from "./pages/MarketBrowse";
import MarketDetail from "./pages/MarketDetail";
import BancoHome from "./pages/BancoHome";
import ProfilePage from "./pages/ProfilePage";
import SellerPage from "./pages/SellerPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import Footer from "./components/Common/Footer";

function App() {
  return (
    // <Layout>
    <Provider store={store}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/marketplace" />
        </Route>
        <Route path="/marketplace" exact>
          <MarketHome />
        </Route>
        <Route path="/items" exact>
          <MarketBrowse />
        </Route>
        <Route path="/items/asset/:itemAddress">
          <MarketDetail />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/profile/:walletAddress">
          <SellerPage />
        </Route>
        <Route path="/cincochicos">
          <BancoHome />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
      {/* Browsepage and Sellerpage dont need footer ar */}
      {/* <Footer /> */}
    </Provider>
    // </Layout>
  );

  //TODO: A PROPER 404 NOT FOUND
  function NoMatch() {
    let location = useLocation();
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
}
export default App;
