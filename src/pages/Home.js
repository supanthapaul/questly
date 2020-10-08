import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


export default function HomePage() {
	const startLogin = useStoreActions(actions => actions.auth.startLogin);
	const setLoginError = useStoreActions(actions => actions.auth.setError);
	const errorState = useStoreState(state => state.auth.error);

	const loginWithGoogle = () => {
		startLogin()
			.catch(error => {
				// login failed, set error state
				setLoginError(error);
			})
	}
	useEffect(() => {
		document.title ="Home | Questly"
	}, [])
	return (
		<>
			<Typography variant="h2">
				Login
			</Typography>
			<Button onClick={loginWithGoogle}>Login with Google</Button>
			{
				errorState && <Typography variant="h5" color="textSecondary">
					{errorState.message}
				</Typography>
			}

		</>
	);
}