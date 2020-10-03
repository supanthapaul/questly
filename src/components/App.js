import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/Login';
import * as ROUTES from '../constants/routes';

function App() {
	return (
		<Router>
			<Navbar />

			<Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
		</Router>
	);
}

export default App;
