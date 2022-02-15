//make profile here or fuck it
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MotiQuote from './MotiQuote';
import { useStoreState } from 'easy-peasy';
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
		width: theme.spacing(22),
		height: theme.spacing(22),
		border: "5px solid white",
		borderRadius: theme.spacing(3),
		background: 'radial-gradient(#6e6e6e, #333)',
		padding: '10px'
	},
	spacePad: {
		paddingLeft: theme.spacing(6),
		paddingRight: theme.spacing(6),
		backgroundColor: '#2c387e'
	},
	textWhite: {
		color: '#ffffff'
	},
	flexCenter: {
		display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'
	}
}));

export default function ProfileBar() {
	const classes = useStyles();
	const authState = useStoreState(state => state.auth.user);
	const { level, currXp, limitXp, rankUrl } = useStoreState(state => state.user.stats);
	const normaliseXp = value => (value - 0) * 100 / (limitXp - 0);
	return (<>
		<br />
		<Grid container spacing={4} className={classes.spacePad}>
			<Grid item xs={12} sm={2} className={classes.flexCenter}>
				<img alt="Rank Image" src={rankUrl} className={classes.large} />
			</Grid>
			<Grid item xs={12} sm={4}>

				<Typography variant="h4" className={classes.textWhite} >{authState.name}</Typography>
				<Typography variant="subtitle1" className={classes.textWhite}>Level {level} Warrior</Typography>
				<br />
				<BorderLinearProgress variant="determinate" value={normaliseXp(currXp)} />
				<Typography variant="subtitle1" className={classes.textWhite}>{currXp}/{limitXp} Experience Points</Typography>
				<Typography variant="subtitle1" className={classes.textWhite}>{limitXp - currXp} more xp to reach Level {level + 1}! </Typography>
			</Grid>
			<Grid item xs={12} sm={6} className={classes.flexCenter}>
				<MotiQuote />
			</Grid>
		</Grid>
		<br />
		<br />
	</>);
} 