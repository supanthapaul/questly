import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import NotesListed from './Note';


function NotesForm() {
	const [note, setNote] = useState("");
	const [notesList, setList] = useState([]);

	const onFormSubmit = (e) => {
		e.preventDefault();
		let notePresent = false;
		notesList.forEach(notesElement => {
			if (notesElement.text == note || notesElement.text == "") {
				notePresent = true;
				return;
			}

		});

		if (notePresent)
			return;

		const newNote = {
			id: uuidv4(),
			text: note
		}
		setList([...notesList, newNote]);
		setNote("");
	}

	function deleteNote(id) {
		setList(notesList.filter(notesElement => notesElement.id != id));
	}
	function updateNote(id, updatedText) {
		const updatedNotes = [...notesList];
		updatedNotes.forEach(notesElement => {
			if (notesElement.id == id) {
				notesElement.text = updatedText;
				return;
			}

		});
		setList(updatedNotes);
	}

	return (
		<>
			<form onSubmit={onFormSubmit} autoComplete="off">
				<TextField id="standard-basic" label="Add Note" onChange={(e) => setNote(e.target.value)} value={note}
					variant="filled" fullWidth/>
			</form>

			<List aria-label="main mailbox folders" align="center">

				{
					notesList.map((notesElement) => {
						console.log(notesList)
						console.log(notesElement.id)
						return <NotesListed notesElement={notesElement} key={notesElement.id} deleteNote={deleteNote} updateNote={updateNote} />
					})

				}

			</List>
		</>
	);
}
export default NotesForm
