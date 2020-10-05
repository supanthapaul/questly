import React, {useContext, useState} from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default function Login() {
	const startLogin = useStoreActions(
    actions => actions.auth.startLogin,
	);
	const userState = useStoreState(state => state.auth.user);
	const errorState = useStoreState(state => state.auth.error);

	return (
    <>
			<Typography variant="h2">
				Login
			</Typography>
			<Button onClick={() => startLogin()}>Login with Google</Button>
			{
				userState.uid ? <Typography variant="h4">
				User logged in as {userState.name}
			</Typography> : <Typography variant="h4">
			User not logged in
		</Typography>
			}
			{
				errorState && <Typography variant="h4" color="textSecondary">
				{errorState.message}
			</Typography>
			}
			
    </>
  );
}