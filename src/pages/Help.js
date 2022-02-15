import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Prompt from "../components/Prompt";

const useStyles = makeStyles((theme) => ({
  root: {
    padding:4,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  Main:
  {
      flexGrow:1,
      maxWidth:100,
  },
  title: {
    textAlign:"left"
  },
  pos: {
    marginBottom: 12,
    textAlign:"left"
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.help}>
          <Paper className={classes.paper} style={{backgroundColor:"#2c387e", color:"#e0e0e0"}}>
          <Typography variant={"h3"}>
            Welcome to Questly
          </Typography>
          <Typography variant={"h6"}>
            This guide will teach you how to use our webapp
          </Typography>
          </Paper>
        </Grid>
        </Grid>
        <br/>
        <br/>
        <br/>
         <Grid container spacing={3}>
         <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Typography variant={"h6"}>
            Let's take a look at the first page you come across after logging in
          </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
          <img src={"/img/Main.png"} alt={"front page"} style={{width:"80%", height:"auto"}}  />
          </Paper>
          </Grid>

          <br/>
          <br/>

        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant={"h5"} align="left" elevation={0}>
              The 3 components are explained below
            </Typography>
          </Paper>
          </Grid> 
          <Grid item xs={1}/>
          <Grid item xs={10}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant={"h4"} >
               I. Quests
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={5} paddingBottom={2} >
            <Paper className={classes.paper} align={"center"} elevation={3}>
              <Prompt/>
            </Paper>  
          </Grid> 
          <Grid item xs={2}>  
          <Paper className={classes.paper} align={"center"} elevation={0}>
            <KeyboardArrowRightIcon fontSize="large"/>
          </Paper>
          </Grid>  
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation={3}>
            <img src={"/img/Quests.png"} alt={"main"} width={"100%"} height={"auto"}/>  
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper} align={"center"} elevation={4}>
              <Typography variant={"body2"}>
                This is the quests text-field, click on it to reveal a dialog box
              </Typography> 
            </Paper>  
          </Grid> 
          <Grid item xs={2}>  
          <Paper className={classes.paper} align={"center"} elevation={0}>
            <KeyboardArrowRightIcon fontSize="large"/>
          </Paper>
          </Grid>  
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation={3}>
            <Typography variant={"body2"}>
                A dialog box appears, with multiple configurations that can can help you personalize and customize your Quest!!
              </Typography> 
            </Paper>
            <br/>
          <br/>
          </Grid>
          <Grid item xs={12}>
          <Divider style={{height:"3px"}}/>
          <br/>
          </Grid>

          
          <Grid container spacing={3}>

          <Grid item xs={1}/>
          <Grid item xs={10}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant={"h4"}>
                II. Notes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={5}>
            <Paper className={classes.paper} align={"center"} elevation={4}>
            <TextField disabled label="Add Note" variant="filled" color="primary" fullWidth value="The purpose of our lives is to be happy.">
              </TextField>
            </Paper>  
          </Grid> 
          <Grid item xs={2}>  
          <Paper className={classes.paper} align={"center"} elevation={0}>
            <KeyboardArrowRightIcon fontSize="large"/>
          </Paper>
          </Grid>  
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation={3}>
            <Card>
            <CardContent>
        <Typography variant={"subtitle1"} className={classes.title} color="textSecondary" gutterBottom>
          October 12 12:45 PM
        </Typography>
        <Typography variant="h6" className={classes.title}>
        The purpose of our lives is to be happy.
        </Typography>
        <p><br/></p>
        <Typography variant="h6" className={classes.title}>
          <IconButton>
        <EditIcon/>     
          </IconButton>
          <IconButton>
        <DeleteIcon/>
          </IconButton>
        </Typography>
      </CardContent>
            </Card>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper} align={"center"} elevation={4}>
              <Typography variant={"body2"}>
                This is the Notes text-field, click on it to add a personal note
              </Typography> 
            </Paper>  
          </Grid> 
          <Grid item xs={2}>  
          <Paper className={classes.paper} align={"center"} elevation={0}>
            <KeyboardArrowRightIcon fontSize="large"/>
          </Paper>
          </Grid>  
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation={3}>
            <Typography variant={"body2"}>
                Press enter and now you can see that the notes are recorded. You can even delete or update them!!
              </Typography> 
            </Paper>
          </Grid>
          <br/> 
          <br/>
          <Grid item xs={12}>
            <Divider style={{height:"3px"}}/>
            <br/> 
          </Grid>
         </Grid>
        </Grid>
         
          <Grid container spacing={3}>
                     
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper} elevation={3}>
              <Typography variant={"h4"}>
              III. Level System
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={1}/>
          <Grid item xs={5}>
            <Paper className={classes.paper} align={"center"} elevation={4}>
            <img src={"/img/XPBar.png"} alt={"main"} width={"80%"} height={"auto"} style={{borderRadius:35}}/>  
            </Paper>  
          </Grid> 
          <Grid item xs={2}>  
          <Paper className={classes.paper} align={"center"} elevation={0}>
            <KeyboardArrowRightIcon fontSize="large"/>
          </Paper>
          </Grid>  
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation={3}>
            <img src={"/img/XPBarInc.png"} alt={"main"} width={"80%"} height={"auto"} style={{borderRadius:35}}/>  
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper} align={"center"} elevation={4}>
              <Typography variant={"body2"}>
                A Rank system has been implemented in this webapp, to incentivize you improving your productivity
              </Typography> 
            </Paper>  
          </Grid> 
          <Grid item xs={2}>  
          <Paper className={classes.paper} align={"center"} elevation={0}>
            <KeyboardArrowRightIcon fontSize="large"/>
          </Paper>
          </Grid>  
          <Grid item xs={5}>
            <Paper className={classes.paper} elevation={3}>
            <Typography variant={"body2"}>
                Doing enough tasks fills up the XP bar, which in turn, levels you up. Now go forth, earn your worth!! 
              </Typography> 
            </Paper>
          </Grid>
          </Grid> 
    </div>
  );
}
