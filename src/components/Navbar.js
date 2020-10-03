import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import * as ROUTES from '../constants/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Questly
          </Typography>
          <Button color="inherit" component={RouterLink} to={ROUTES.LOGIN}>Login</Button>
          <Button color="inherit" component={RouterLink} to={ROUTES.DASHBOARD}>Dashboard</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}