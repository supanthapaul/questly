import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';


export default function FormDialog()
{
    const useStyles = makeStyles((theme) => 
    ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
          },
          textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 375,
          },
          paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
          },
    }));
    const marks = [
        {
          value: 0,
          label: 'Easy',
        },
        {
          value: 1,
          label: 'Medium',
        },
        {
          value: 2,
          label: 'Hard',
        }
      ];
    const[Open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubChange = () => {
    setChecked(!checked);
  };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

      
    const classes = useStyles();  
    return (
<>
      <div>
        <Typography variant="h6">
        Quests
        <TextField disabled label="Click here to start adding a quest" variant="filled" color="primary" onClick={handleClickOpen} fullWidth>
        </TextField>
        </Typography>
        <Dialog open={Open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title"><b>Add a Quest</b></DialogTitle>
          <DialogContent>
            <DialogContentText>
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Quest"
              placeholder="Ex. Water the plants"
              fullWidth
              />
            <Button fullWidth onClick={handleSubChange}>
                <AddIcon/>
                ADD CHECKLIST
            </Button>
            <Collapse in={checked}>
            <TextField size="small" autoFocus fullWidth variant="standard"
			    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                                <AddIcon />
                        </InputAdornment>
                        ),}}/>
                        <p><br/></p> 
            </Collapse>
            <form className={classes.container} noValidate>        
      <TextField
        fullWidth
        id="datetime-local"
        label="Due Date"
        type="datetime-local"
        InputLabelProps={{
            shrink: true,
        }}
        />
      <p><br/><br/><br/></p>
       <Slider
        max={2}
        defaultValue={0}
        aria-labelledby="discrete-slider-restrict"
        step={1}
        valueLabelDisplay="off"
        marks={marks}
        />
    </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              CONFIRM
            </Button>
          </DialogActions>
        </Dialog>
      </div>
        </>
  );
}