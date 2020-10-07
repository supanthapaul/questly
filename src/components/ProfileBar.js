//make profile here or fuck it
import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MotiQuote from './MotiQuote';

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
	}
}));

export default function ProfileBar() {
	const [progress, setProgress] = useState(0);
	const classes = useStyles();

	return (<>

		<br />
		<br />
		<Grid container spacing={2}>
			<Grid item xs={4} sm={2}>
				<Avatar alt="Reeeeeeeee" src="https://qphs.fs.quoracdn.net/main-qimg-885239a3188006aa5e67cbc61403a2c2" className={classes.large} />
			</Grid>
			<Grid item xs={8} sm={4}>
				<br />
				<br />
				<br />
				<BorderLinearProgress variant="determinate" value={progress} />
				<TextField value={progress} onChange={(e) => setProgress(e.target.value)} />
			</Grid>
			<Grid item xs={12} sm={6}>
				<MotiQuote />
			</Grid>
		</Grid>
		<br />
		<br />
	</>);
} 