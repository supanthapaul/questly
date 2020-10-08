const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const INITIAL_STATE = {
	level: 1,
	currXp: 0,
	limitXp: 50,
	maxLimit: 500,
}

exports.createUserStats = functions.auth.user().onCreate((user) => {
	// write initial stats for each user
	admin.firestore().collection("stats").doc(user.uid).set(INITIAL_STATE)
		.then(res => {
			console.log(`Initial stats for user ${user.displayName} written successfully: ${res}`);
			return res;
		})
		.catch(err => {
			console.log(`FAILED writing initial stats for user ${user.displayName}: ${err.message}`);
			throw new Error(err.message);
		})
});
