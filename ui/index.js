import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/app";
// import createStore from "./store";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { Product } from "./components/productPage";
import "bootstrap/dist/css/bootstrap.min.css";

// const store = createStore();

render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
		</Switch>
	</BrowserRouter>,
	document.getElementById("root")
);
