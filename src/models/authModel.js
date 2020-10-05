import { action, thunk } from 'easy-peasy';
import firebase, {googleAuthProvider} from '../firebase/firebaseSetup';

const authModel = {
	user: {
		uid: null,
		name: "User",
		email: null
	},
	error: null,
	// Start login with Google
	startLogin: thunk((actions, payload) => { 
		firebase.auth().signInWithPopup(googleAuthProvider)
			.then(authUser => {
				// login successful
				actions.login(authUser.user);
				console.log(authUser.user);
			})
			.catch(error => {
				// login failed, set error state
				actions.setError(error);
			})
	}),
	// start logout
	startLogout: thunk((actions, payload) => {
		firebase.auth().signOut()
			.then(() => {
				// logout successful
				actions.logout();
			}).catch(function(error) {
				// logout failed, set error state
				actions.setError(error);
			});
	}),
	// Set login state
	login: action((state, payload) => {
		state.user = {
			uid: payload.uid,
			name: payload.displayName,
			email: payload.email
		};
	}),
	// set logout state
	logout: action((state, payload) => {
		state.user = {
			uid: null,
			name: "User",
			email: null
		};
	}),
	// set error state
	setError: action((state, payload) => {
		state.error = payload;
	}),
}

export default authModel;