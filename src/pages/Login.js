import React, {useContext, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import {FirebaseContext} from '../firebase';

const INITIAL_STATE = {
	user: null,
	error: null
}
export default function Login() {
	const firebase = useContext(FirebaseContext);
	const [loginState, setLoginState] = useState(INITIAL_STATE);

	const signInWithGoogle = () => {
		firebase
			.doSignInWithGoogle()
			.then(authUser => {
				setLoginState({
					...loginState,
					user: authUser
				});
			})
			.catch(error => {
						setLoginState({
							...loginState,
							error: error
						});
			})
	}
	return (
    <>
			<Typography variant="h2">
				Login
			</Typography>
			<Button onClick={() => signInWithGoogle()}>Login with Google</Button>
			{
				loginState.user && <Typography variant="h2">
				User logged in
			</Typography>
			}
			{
				loginState.error && <pre>
					{JSON.stringify(loginState.error,null, 2)}
				</pre>
			}
			
    </>
  );
}