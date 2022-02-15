import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Divider from '@material-ui/core/Divider';



const useStyles = makeStyles((theme) => ({
  root: {
    padding:40,
    overflow:"hidden",
    flexGrow: 1,
    
  },
  paper: {
    fontFamily:"Comfortaa", 
    padding: theme.spacing(2),
    textAlign: 'center',
    elevation:3,
  },
  description: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height:250,
    backgroundColor:'#757de8',
  },
  Divider:
  {
    border:"2px solid #808080",
    backgroundColor:"#808080",
  },
  the_Boys:
  {
    display:"flex",
    marginLeft: "auto",
    marginRight: "auto",
    width:"50%",
    borderRadius:200,
  }

}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
   <div className={classes.root} >
      <Grid container spacing={3}>
        <Grid item xs={4}>
            <img src={"/img/Quest.ly.png"} alt={"Questly Logo"} className={classes.the_Boys}/>
        </Grid>
        <Grid item xs={1}>
        <Divider orientation="vertical" className={classes.Divider} />
        </Grid>
        <Grid item xs={7}>
            <Typography variant={"p"} style={{fontSize:50}}>
              About Questly
            </Typography>
            <Typography variant={'body2'}style={{fontSize:20}}>
              Questly is a lifestyle app that deals with the management of your daily tasks and essential notes.<br/>
              Its efficient and intuitive layout and UI helps you get the best out of this WebApp.
            </Typography>
        </Grid>
        <br/>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <Typography variant={"h4"}>
              The Team
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={3}>
          <Link href={"mailto:supantha.paul2019@vitbhopal.ac.in"} underline={"none"}>
          <img src={"/img/Supantha.png"} alt={"no"} className={classes.the_Boys}/>
          <Typography variant={"h6"}>
            Supantha Paul<br/>
            </Typography>
            <Typography variant="caption">
            19BCG10011
            </Typography>
        </Link>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={3}>
          <Link underline={"none"} href={"mailto:deepargh.chatterjee2019@vitbhopal.ac.in"}>
          <img src={"/img/Deepargh.png"} alt={"no"} className={classes.the_Boys}/>
          <Typography variant={"h6"}>
            Deepargh Chatterjee<br/>
            </Typography>
            <Typography variant="caption">
            19BCG10024
            </Typography>
        </Link>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper} elevation={3}>
          <Link underline={"none"} href={"mailto:varun.a2019@vitbhopal.ac.in"}>
          <img src={"/img/No.png"} alt={"no"} className={classes.the_Boys}/>
          <Typography variant={"h6"}>
            Varun A. Vyas<br/>
          </Typography>
            <Typography variant="caption">
            19BCG10081
            </Typography>
        </Link>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>

          <Typography variant={"body2"} style={{fontSize:24}} >
          A Mini Project Report Submitted in Partial Fulfilment for the award of BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE AND ENGINEERING (Specialization in Gaming Technology)
          </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}