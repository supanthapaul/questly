import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import MotiQuote from '../components/MotiQuote';
import Notes from '../components/Notes';

export default function Home() {
	const authState = useStoreState(state => state.auth.user);
  return (
    <>
			<Typography variant="h2">
				Dashboard
			</Typography>
			<Typography variant="h5">
				Welcome back, {authState.name}
			</Typography>
			<MotiQuote />
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<Notes />
				</Grid>
			</Grid>
    </>
  );
}