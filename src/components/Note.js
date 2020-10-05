import React, { useState } from 'react';
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
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

function NotesListed(props) {
	const [open, setOpen] = useState(false);
	const [textUpdate, setText] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		props.updateNote(props.notesElement.id, textUpdate)
		setOpen(false);
	};


	return (
		<div >
			<ListItem>
				<Card >
					<CardHeader
						subheader="September 14, 2016"
					/>
					<CardContent>
						<Typography variant="body2" component="p">
							{props.notesElement.text}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<IconButton aria-label="delete" onClick={() => props.deleteNote(props.notesElement.id)}>
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
						value={textUpdate} onChange={(e) => setText(e.target.value)} autoComplete="off"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Confirm
				</Button>

				</DialogActions>
			</Dialog>


		</div>

	);
}
export default NotesListed