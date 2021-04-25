import "./App.css";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import TrialApp from "./pages/Trialapp";
import MarketHome from "./pages/MarketHome";
import MarketBrowse from "./pages/MarketBrowse";
import MarketDetail from "./pages/MarketDetail";

function App() {
  return (
    // <Layout>
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
      <Route path="/items/:itemAddress">
        <MarketDetail />
      </Route>
      <Route path="/trial">
        <TrialApp />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
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
