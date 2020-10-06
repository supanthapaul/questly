import React from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from '../pages/Home';
import DashboardPage from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import * as ROUTES from '../constants/routes';

function App() {
	return (
		<Router >
			<Navbar />

			<Route exact path={ROUTES.HOME} component={HomePage} />
      <PrivateRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
		</Router>
	);
}

export default App;
