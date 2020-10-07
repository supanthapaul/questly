import { action, thunk } from 'easy-peasy';
import firebase, { database as db } from '../firebase/firebaseSetup';
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
		return db.collection("quests").add(newQuest).then(ref => {
			// add quest to local state
			actions.addQuest({
				id: ref.id,
				...newQuest
			})
		})
	}),
	// update a quest from firebase by id
	// payload --> updated quest
	startUpdateQuest: thunk((actions, payload) => {
		return db.collection("quests").doc(payload.id).set({
			...payload
		}, { merge: true })
			.then(() => {
				// update success, update to local state
				actions.updateQuest(payload);
			})
	}),
	// get all the quests of the user from firebase
	// payload --> uid
	startSetQuests: thunk((actions, payload) => {
		return db.collection("quests").where("uid", "==", payload).get()
			.then(snapshot => {
				const quests = [];
				snapshot.forEach(doc => {
					quests.push({
						id: doc.id,
						...doc.data()
					});
				});
				// set quests to local state
				actions.setQuests(quests);
			})
	}),
	// delete a quest from firebase
	// payload --> id
	startDeleteQuest: thunk((actions, payload) => {
		return db.collection("quests").doc(payload).delete()
			.then(() => {
				// delete quest from local state
				actions.deleteQuest(payload);
			})
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