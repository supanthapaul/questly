import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import NotesListed from './Note';


function NotesForm() {
	const [note, setNote] = useState("");
	const itemsState = useStoreState(state => state.notes.items);
	const authState = useStoreState(state => state.auth.user);
	const notesError = useStoreState(state => state.notes.error);
	const startAddNote = useStoreActions(actions => actions.notes.startAddNote);
	const startUpdateNote = useStoreActions(actions => actions.notes.startUpdateNote);
	const startDeleteNote = useStoreActions(actions => actions.notes.startDeleteNote);
	const setNoteError = useStoreActions(actions => actions.notes.setError);

	const onFormSubmit = (e) => {
		e.preventDefault();
		let notePresent = false;
		itemsState.forEach(item => {
			if (item.text === note || item.text === "") {
				notePresent = true;
				return;
			}
		});
		if (notePresent)
			return;
		const newNote = {
			text: note,
			uid: authState.uid
		}
		startAddNote(newNote).catch(err => {
			setNoteError(err);
			return;
		});
		setNote("");
	}

	function deleteNote(id) {
		startDeleteNote(id).catch(err => {
			setNoteError(err);
			return;
		});
	}
	function updateNote(updatedNote) {
		startUpdateNote(updatedNote).catch(err => {
			setNoteError(err);
			return;
		});
	}

	return (
		<>
			<form onSubmit={onFormSubmit} autoComplete="off">
				<TextField id="standard-basic" label="Add Note" onChange={(e) => setNote(e.target.value)} value={note}
					variant="filled" fullWidth/>
			</form>
			<List aria-label="main mailbox folders" align="center">
				{
					itemsState.map((note) => {
						return <NotesListed note={note} key={note.id} deleteNote={deleteNote} updateNote={updateNote} />
					})
				}
			</List>
		</>
	);
}
export default NotesForm
