import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import QuestForm from './QuestForm';
import Quest from './Quest';

export default function QuestList(props) {
	const [dialogueOpen, setDialogueOpen] = useState(false);

	const itemsState = useStoreState(state => state.quests.items);
	const authState = useStoreState(state => state.auth.user);
	const questsError = useStoreState(state => state.quests.error);
	const startAddQuest = useStoreActions(actions => actions.quests.startAddQuest);
	const startUpdateQuest = useStoreActions(actions => actions.quests.startUpdateQuest);
	const startDeleteQuest = useStoreActions(actions => actions.quests.startDeleteQuest);
	const setQuestError = useStoreActions(actions => actions.quests.setError);

	const deleteQuest = (id) => {
		console.log("delete quest");
		startDeleteQuest(id)
		.catch((error)=>setQuestError(error));
	}
	const updateQuest = (updatedQuest) => {
		startUpdateQuest(updatedQuest)
		.catch((error)=>{setQuestError(error)});
	}
	const addQuest = (quest) => {
		const newQuest={
			...quest,
			uid: authState.uid
		}
		startAddQuest(newQuest)
		.catch((error)=>setQuestError(error));
	}
	return (<>
		<Typography variant="h6">Quests</Typography>
		<form autoComplete="off">
				<TextField id="standard-basic" label="Click to start adding a Quest" 
					onClick={() => setDialogueOpen(true)}
					variant="filled" fullWidth disabled />
		</form>
		<QuestForm dialogueOpen={dialogueOpen} setDialogueOpen={setDialogueOpen} onFormSubmit={addQuest}/>
		<List aria-label="main mailbox folders" align="center">
			{
				itemsState.map((quest) => {
					if(!quest.isCompleted)
						return <Quest quest={quest} key={quest.id} deleteQuest={deleteQuest} updateQuest={updateQuest} openSnackbar={props.openSnackbar} />
				})
			}
		</List>
	</>
	);
}



