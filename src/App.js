import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
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
    </Switch>
    // </Layout>
  );
}

export default App;
