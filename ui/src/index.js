import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ExpertPage } from './pages/ExpertPage/ExpertPage';
import { Feedback } from './pages/Feedback/FeedBack';
import { RouteInfoPage } from './pages/RouteInfoPage/RouteInfoPage';
import { CreateCategoryPage } from './pages/CreateCategoryPage/CreateCategoryPage';
import { AllCategoryPage } from './components/AllCategoryPage';
import { NewProposalPage } from './components/proposals/newProposalPage';
import { ProposalRoutes } from './components/proposalRoutes';
import { ProposalCard } from './components/proposalCard';
import { onControlPage } from './components/proposals/onControl';
import { onWorkPage } from './components/proposals/onWork';
import { onOverduePage } from './components/proposals/onOverdue';
import { AllProposalPage } from './components/proposals/allProposals';
import { EditCategoryPage } from './pages/EditCategoryPage/EditCategoryPage';
import { store } from './modules/store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.default.css';
import './css/fontastic.css';

render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={ExpertPage} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/new" component={NewProposalPage} />
        <Route path="/control" component={onControlPage} />
        <Route path="/inwork" component={onWorkPage} />
        <Route path="/overdue" component={onOverduePage} />
        <Route path="/all" component={AllProposalPage} />
        <Route path="/allCategory" component={AllCategoryPage} />
        <Route path="/set_route" component={ProposalRoutes} />
        <Route path="/all_route/:id" component={RouteInfoPage} />
        <Route exact path="/set_cat" component={CreateCategoryPage} />
        <Route path="/all_cat/:id" component={EditCategoryPage} />
        <Route path="/card/:id" component={ProposalCard} />
        <Route path="/createCategory" component={CreateCategoryPage} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
