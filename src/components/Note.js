import React, { useState } from 'react';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	fullWidth: {
		width: '100%',
	},
	noteDate: {
		fontSize: '0.8rem',
	},
	cardContent: {
		paddingTop: '0',
		paddingBottom: '0'
	},
	cardActions: {
		paddingTop: '0',
		paddingBottom: '0'
	},
	noteText: {
		fontSize: '1.2rem'
	},
}))

function NotesListed(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [note, setNote] = useState(props.note);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleNoteChange = (e) => {
		setNote({
			...note,
			text: e.target.value
		})
	}

	const handleUpdate = () => {
		if(note.text === "") {
			setOpen(false);
			return;
		}
		props.updateNote(note)
		setOpen(false);
	};
	const handleClose = () => {
		setNote(props.note);
		setOpen(!open);
	};

	return (
		<div>
			<ListItem>
				<Card className={classes.fullWidth}>
					<CardContent className={classes.cardContent}>

						<Typography variant="body2" component="p" color="textSecondary" className={classes.noteDate}>
							{dayjs(props.note.date).format("MMMM D, h:mm A")}
						</Typography>
						<Typography variant="body2" component="p" className={classes.noteText}>
							{props.note.text}
						</Typography>
					</CardContent>
					<CardActions disableSpacing className={classes.cardActions}>
						<IconButton aria-label="delete" onClick={() => props.deleteNote(props.note.id)}>
							<DeleteIcon />
						</IconButton>
						<IconButton aria-label="edit" onClick={handleClickOpen}>
							<EditIcon />
						</IconButton>
					</CardActions>

				</Card>
			</ListItem><Divider />
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Update</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the updated text
				</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Update"
						type="text"
						fullWidth
						value={note.text} onChange={handleNoteChange} autoComplete="off"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleUpdate} color="primary">
						Confirm
				</Button>

				</DialogActions>
			</Dialog>


		</div>

	);
}
export default NotesListed