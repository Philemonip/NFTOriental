import "./App.css";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import TrialApp from "./pages/Trialapp";
import MarketHome from "./pages/MarketHome";
import MarketBrowse from "./pages/MarketBrowse";
import MarketDetail from "./pages/MarketDetail";
import BancoHome from "./pages/BancoHome";
import { Provider } from "react-redux";
import store from "./redux/store";

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
				<Route path="/items/:itemAddress">
					<MarketDetail />
				</Route>
				<Route path="/trial">
					<TrialApp />
				</Route>
				<Route path="/cincochicos">
					<BancoHome />
				</Route>
				<Route path="*">
					<NoMatch />
				</Route>
			</Switch>
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
