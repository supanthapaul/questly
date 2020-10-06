import { action, thunk } from 'easy-peasy';
import firebase, {googleAuthProvider} from '../firebase/firebaseSetup';

const INITIAL_STATE = {
	uid: null,
	name: "User",
	email: null,
	profilePhoto: null
}

const authModel = {
	user: INITIAL_STATE,
	error: null,
	// Start login with Google
	startLogin: thunk((actions, payload) => { 
		return firebase.auth().signInWithPopup(googleAuthProvider);
	}),
	// start logout
	startLogout: thunk((actions, payload) => {
		return firebase.auth().signOut();
	}),
	// Set login state
	login: action((state, payload) => {
		state.user = {
			uid: payload.uid,
			name: payload.displayName,
			email: payload.email,
			profilePhoto: payload.photoURL
		};
	}),
	// set logout state
	logout: action((state, payload) => {
		state.user = INITIAL_STATE;
	}),
	// set error state
	setError: action((state, payload) => {
		state.error = payload;
	}),
}

export default authModel;