import authModel from './authModel';
import notesModel from './notesModel';
import questsModel from './questsModel';
import userModel from './userModel';

const storeModel = {
	auth: authModel,
	notes: notesModel,
	quests: questsModel,
	user: userModel
}

export default storeModel;