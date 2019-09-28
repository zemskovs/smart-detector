import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/app";
import createStore from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Product } from "./components/productPage";
import { Feedback } from "./components/feedBack";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.default.css";
import "./css/fontastic.css";
import { NewProposalPage } from "./components/newProposalPage";

const store = createStore();

render(
	<BrowserRouter>
		<Provider store={store}>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/feedback" component={Feedback} />
				<Route path="/new" component={NewProposalPage} />
			</Switch>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
