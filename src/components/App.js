import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from '../pages/Home';
import AboutPage from '../pages/About';
import HelpPage from '../pages/Help';
import DashboardPage from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import * as ROUTES from '../constants/routes';

function App() {
	return (
		<Router >
			<Navbar />

			<Route exact path={ROUTES.HOME} component={HomePage} />
			<Route exact path={ROUTES.ABOUT} component={AboutPage} />
			<Route exact path={ROUTES.HELP} component={HelpPage} />
      <PrivateRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
		</Router>
	);
}

export default App;
