import { action, thunk } from 'easy-peasy';
import { database as db, storage } from '../firebase/firebaseSetup';

const INITIAL_STATE = {
	level: 1,
	currXp: 0,
	limitXp: 50,
	maxLimit: 500,
	rankUrl: "https://i.ibb.co/Tt6h7Zz/rank-1.png"
}

const userModel = {
	stats: {
		...INITIAL_STATE
	},
	// add xp to user
	// payload -> uid
	startSetStats: thunk((actions, payload) => {
		return db.collection("stats").doc(payload).onSnapshot(doc => {
			if(doc.data()) {
				// set stats to local state
				actions.setStats(doc.data())
				// get rank image url
				actions.startSetRankUrl(doc.data().level);
			}
		}, err => {
			actions.setError(err);
		})
	}),
	// payload => {uid, updatedStats}
	startUpdateStats: thunk((actions, payload) => {
		const {uid, updatedStats} = {...payload};
		console.log(updatedStats)
		return db.collection("stats").doc(uid).set(updatedStats, { merge: true })
	}),
	// Gets rank image url from firebase bucket
	// payload -> level
	startSetRankUrl: thunk((actions, payload) => {
		return storage.ref(`ranks/rank (${payload}).png`).getDownloadURL()
			.then(url => {
				actions.setRankUrl(url);
			})
	}),
	setStats: action((state, payload) => {
		state.stats = {
			...state.stats,
			...payload
		}
	}),
	setRankUrl: action((state, payload) => {
		state.stats = {
			...state.stats,
			rankUrl: payload
		}
	}),
	setError: action((state, payload) => {
		state.error = payload;
	})
}

export default userModel;