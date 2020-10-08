import React, {useEffect} from 'react';
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
import QuestList from '../components/QuestList';

import ProfileBar from '../components/ProfileBar';

const useStyles = makeStyles((theme) =>({
	padding:{
		paddingRight:theme.spacing(8),
		paddingLeft:theme.spacing(8),
	}
}))

export default function Home() {
	const classes = useStyles();
	const authState = useStoreState(state => state.auth.user);

	useEffect(() => {
		document.title ="Home | Questly"
	}, [])

  return (
    <>
			<ProfileBar/>
			<Grid container spacing={5} className={classes.padding}>
				<Grid item xs={12} sm={6}>
					<QuestList />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Notes />
				</Grid>
			</Grid>
    </>
  );
}