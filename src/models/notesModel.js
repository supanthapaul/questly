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
		const newDoc = db.collection("notes").doc();
		return newDoc.set({
			id: newDoc.id,
			...newNote
		});
	}),
	// update a note from firebase by id
	// payload --> updated note
	startUpdateNote: thunk((actions, payload) => {
		return db.collection("notes").doc(payload.id).set({
			...payload,
			date: dayjs().format()
		}, { merge: true })

	}),
	// get all the notes of the user from firebase
	// payload --> uid
	startSetNotes: thunk((actions, payload) => {
		return db.collection("notes").where("uid", "==", payload).onSnapshot(snapshot => {
			const notes = [];
			snapshot.forEach(doc => {
				notes.push({
					id: doc.id,
					...doc.data()
				});
			});
			// set notes to local state
			actions.setNotes(notes);
			}, error => {
				// set error to local state
				actions.setError(error);
			}
		)
			
	}),
	// delete a note from firebase
	// payload --> id
	startDeleteNote: thunk((actions, payload) => {
		return db.collection("notes").doc(payload).delete()
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