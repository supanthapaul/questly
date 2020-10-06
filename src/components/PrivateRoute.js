import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

export const PrivateRoute = ({
	component: Component,
	...rest
}) => {
	const authState = useStoreState(state => state.auth.user);
	const isAuthenticated = authState.uid ? true : false;
	return (
		<Route {...rest} component={(props) => (
			isAuthenticated ? (
				<div>
					<Component {...props} />
				</div>
			) : (
					<Redirect to="/" />
				)
		)} />
	)
}

export default PrivateRoute;