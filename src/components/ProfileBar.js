//make profile here or fuck it
import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MotiQuote from './MotiQuote';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Typography from '@material-ui/core/Typography';

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 20,
		borderRadius: 5,
	},
	colorPrimary: {
		backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
	},
	bar: {
		borderRadius: 5,
		backgroundColor: '#1a90ff',
	},
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),

		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	large: {
		width: theme.spacing(25),
		height: theme.spacing(25),
		border: "5px solid white",
		backgroundColor: '#333'
	},
	spacePad:{
		paddingLeft: theme.spacing(6),
		paddingRight: theme.spacing(6),
		backgroundColor: '#2c387e'
	},
	textWhite:{
		color: '#ffffff'
	}
}));

export default function ProfileBar() {
	const [progress, setProgress] = useState(69);
	const classes = useStyles();
	const authState = useStoreState(state => state.auth.user);

	return (<>
		<Grid container spacing={4} className={classes.spacePad}>
			<Grid item xs={4} sm={2}>
				<Avatar alt="Reeeeeeeee" src="https://i.redd.it/vrnjfeshnjt41.jpg" className={classes.large} />
			</Grid>
			<Grid item xs={8} sm={4}>
				<br />
	<Typography variant="h4" className={classes.textWhite} >{authState.name}</Typography>
				<br />
				<BorderLinearProgress variant="determinate" value={progress} />
				<Typography variant="subtitle1" className={classes.textWhite}>Level 2 nibba</Typography>
				<Typography variant="subtitle1" className={classes.textWhite}>69/100</Typography>
			</Grid>
			<Grid item xs={12} sm={6}>
				<br/>
				<br/>
				<MotiQuote />
			</Grid>
		</Grid>
		<br />
		<br />
	</>);
} 