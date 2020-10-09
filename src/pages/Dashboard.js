import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import MotiQuote from '../components/MotiQuote';
import Notes from '../components/Notes';
import QuestList from '../components/QuestList';


import ProfileBar from '../components/ProfileBar';

const useStyles = makeStyles((theme) => ({
	padding: {
		paddingRight: theme.spacing(8),
		paddingLeft: theme.spacing(8),
	}
}))

export default function Home() {
	const classes = useStyles();
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackPack, setSnackPack] = React.useState([]);
	const [snackbarMessageInfo, setSnackbarMessageInfo] = React.useState(undefined);

	const authState = useStoreState(state => state.auth.user);

	useEffect(() => {
		document.title = "Home | Questly"
	}, [])

	// ----- SNACKBAR FUNCTIONS -----
  React.useEffect(() => {
    if (snackPack.length && !snackbarMessageInfo) {
      // Set a new snack when we don't have an active one
      setSnackbarMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setSnackbarOpen(true);
    } else if (snackPack.length && snackbarMessageInfo && snackbarOpen) {
      // Close an active snack when a new one is added
      setSnackbarOpen(false);
    }
  }, [snackPack, snackbarMessageInfo, snackbarOpen]);

  const openSnackbar = (message) => () => {
		console.log("opening snakcbar")
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSnackbarExited = () => {
    setSnackbarMessageInfo(undefined);
  };

	return (
		<>
			<ProfileBar />
			<Grid container spacing={5} className={classes.padding}>
				<Grid item xs={12} sm={6}>
					<QuestList openSnackbar={openSnackbar} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Notes />
				</Grid>
			</Grid>
			{/* NOTIFICATION SNAKBAR */}
			<Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				key={snackbarMessageInfo ? snackbarMessageInfo.key : undefined}
				open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} 
				onExited={handleSnackbarExited}
				message={snackbarMessageInfo ? snackbarMessageInfo.message : undefined} action={<CheckCircleOutlineIcon/>} />
		</>
	);
}