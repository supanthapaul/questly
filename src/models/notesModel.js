import { action, thunk } from 'easy-peasy';
import firebase, { database as db } from '../firebase/firebaseSetup';
import dayjs from 'dayjs';

const notesModel = {
	items: [],
	error: null,
	// add a single note to firebase
	// payload --> note
	startAddNote: thunk((actions, payload) => {
		const newNote = {
			...payload,
			date: dayjs().format()
		}
		return db.collection("notes").add(newNote).then(ref => {
			// add note to local state
			actions.addNote({
				id: ref.id,
				...newNote
			})
		})
	}),
	// update a note from firebase by id
	// payload --> updated note
	startUpdateNote: thunk((actions, payload) => {
		return db.collection("notes").doc(payload.id).set({
			...payload
		}, { merge: true })
			.then(() => {
				// update success, update to local state
				actions.updateNote(payload);
			})
	}),
	// get all the notes of the user from firebase
	// payload --> uid
	startSetNotes: thunk((actions, payload) => {
		return db.collection("notes").where("uid", "==", payload).get()
			.then(snapshot => {
				const notes = [];
				snapshot.forEach(doc => {
					notes.push({
						id: doc.id,
						...doc.data()
					});
				});
				// set notes to local state
				actions.setNotes(notes);
			})
	}),
	// delete a note from firebase
	// payload --> id
	startDeleteNote: thunk((actions, payload) => {
		return db.collection("notes").doc(payload).delete()
			.then(() => {
				// delete note from local state
				actions.deleteNote(payload);
			})
	}),
	addNote: action((state, payload) => {
		state.items = [...state.items, payload];
	}),
	updateNote: action((state, payload) => {
		state.items = state.items.map(note => {
			if(note.id === payload.id) {
				return {...note, text: payload.text};
			}
			return {...note}
		});
	}),
	deleteNote: action((state, payload) => {
		state.items = state.items.filter(note => note.id != payload)
	}),
	setNotes: action((state, payload) => {
		state.items = [...payload]
	}),
	setError: action((state, payload) => {
		state.error = payload;
	})
}

export default notesModel;