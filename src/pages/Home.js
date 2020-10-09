import React, { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link as RouterLink } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	paper:
	{
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}


}));


export default function HomePage() {
	const classes = useStyles();
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
		<br/>
		<Grid container spacing={3}>
			<Grid item xs={5}>
			<Paper className={classes.paper} elevation={0}>	
			<img src={"/img/Quest.ly.png"} alt={"questly"} width={"50%"} height={"auto"}/>
			<Typography variant={"h5"}>
				<b>
				Gamify your Task Management
				</b>
			</Typography>
			</Paper>
			</Grid>	
			<Grid  item xs={2}>
					<Divider orientation={"vertical"}/>
			</Grid >
			<Grid item xs={5}>
				<Paper className={classes.paper} elevation={0} style={{ display:"flex", flexDirection:"column", height:"400px", width:"400px", alignItems:"center"
				,justifyContent:"center"}}>
					<Typography variant={"h4"}>
						Login to Continue
					</Typography>
					<br/>
			<Button startIcon={<img src={"/img/googleIcon.png"}/>} variant="contained" color="primary" onClick={loginWithGoogle}>Login with Google</Button>
			{
				errorState && <Typography variant="h5" color="textSecondary">
					{errorState.message}
				</Typography>
			}
			</Paper>
			</Grid>
		</Grid>

		</>
	);
}