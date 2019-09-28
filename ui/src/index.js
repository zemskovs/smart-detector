import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/app";
import createStore from "./store";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Feedback } from "./components/feedBack";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.default.css";
import "./css/fontastic.css";
import { NewProposalPage } from "./components/newProposalPage";
import { ProposalRoutes } from "./components/proposalRoutes";
import { ProposalCard } from "./components/proposalCard";
import { CreateCategoryPage } from "./components/createCategoryPage";

const store = createStore();

render(
	<BrowserRouter>
		<Provider store={store}>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/feedback" component={Feedback} />
				<Route path="/new" component={NewProposalPage} />
				<Route path="/set_route" component={ProposalRoutes} />
				<Route path="/card/:id" component={ProposalCard} />
				<Route path="/createCategory" component={CreateCategoryPage} />
			</Switch>
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
