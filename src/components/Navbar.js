import React, {useEffect} from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as ROUTES from '../constants/routes';
import firebase from '../firebase/firebaseSetup';

const useStyles = makeStyles((theme) => ({
  root: {
		flexGrow: 1,
		marginBottom: theme.spacing(7.3)
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
	const classes = useStyles();
	const history = useHistory();
	const startLogout = useStoreActions(actions => actions.auth.startLogout);
	const startSetNotes = useStoreActions(actions => actions.notes.startSetNotes);
	const startSetQuests = useStoreActions(actions => actions.quests.startSetQuests);
	const startSetStats = useStoreActions(actions => actions.user.startSetStats);
	const setLogin = useStoreActions(actions => actions.auth.login);
	const setLogout = useStoreActions(actions => actions.auth.logout);
	const authState = useStoreState(state => state.auth.user);

	useEffect(() => {
		// Listen for firebase auth change event
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				// store user in store
				setLogin(user);
				// fetch all the notes from server
				startSetNotes(user.uid)
				// fetch all the quests from server
				startSetQuests(user.uid)
				// fetch user stats from server
				startSetStats(user.uid)
				history.push('/dashboard');
			}
			else {
				setLogout();
				history.push('/');
			}
		})
	}, []);

	const logoutUser = () => {
		startLogout();
	}

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Questly
          </Typography>
					{
						authState.uid ?
						<>
						<Button color="inherit" onClick={logoutUser} >Logout</Button>
						<Button color="inherit" component={RouterLink} to={ROUTES.DASHBOARD}>Dashboard</Button>
						</> :
						<Button color="inherit" component={RouterLink} to={ROUTES.HOME}>Login</Button>
					}
					<Button color="inherit" component={RouterLink} to={ROUTES.ABOUT}>About</Button>
					<Button color="inherit" component={RouterLink} to={ROUTES.HELP}>Help</Button>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}