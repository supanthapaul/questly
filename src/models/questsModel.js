import { action, thunk } from 'easy-peasy';
import { database as db } from '../firebase/firebaseSetup';
import dayjs from 'dayjs';

const questsModel = {
	items: [],
	error: null,
	// add a single quest to firebase
	// payload --> quest
	startAddQuest: thunk((actions, payload) => {
		const newQuest = {
			...payload,
			date: dayjs().format()
		}
		const newDoc = db.collection("quests").doc();
		return newDoc.set({
			id: newDoc.id,
			...newQuest
		});
	}),
	// update a quest from firebase by id
	// payload --> updated quest
	startUpdateQuest: thunk((actions, payload) => {
		return db.collection("quests").doc(payload.id).set({
			...payload
		}, { merge: true })

	}),
	// get all the quests of the user from firebase
	// payload --> uid
	startSetQuests: thunk((actions, payload) => {
		return db.collection("quests").where("uid", "==", payload).onSnapshot(snapshot => {
			const quests = [];
			snapshot.forEach(doc => {
				quests.push({
					id: doc.id,
					...doc.data()
				});
			});
			// set quests to local state
			actions.setQuests(quests);
			}, error => {
				// set error to local state
				actions.setError(error);
			}
		)
			
	}),
	// delete a quest from firebase
	// payload --> id
	startDeleteQuest: thunk((actions, payload) => {
		return db.collection("quests").doc(payload).delete()
	}),
	addQuest: action((state, payload) => {
		state.items = [...state.items, payload];
	}),
	updateQuest: action((state, payload) => {
		state.items = state.items.map(quest => {
			if(quest.id === payload.id) {
				return {...quest, text: payload.text};
			}
			return {...quest}
		});
	}),
	deleteQuest: action((state, payload) => {
		state.items = state.items.filter(quest => quest.id != payload)
	}),
	setQuests: action((state, payload) => {
		state.items = [...payload]
	}),
	setError: action((state, payload) => {
		state.error = payload;
	})
}

export default questsModel;