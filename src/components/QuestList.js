// function pushQuest(quest){
// 	const newQuest={
// 		id:uudiv4(),
// 		...quest,
// 	}
// 	setQuestList([...questList, newQuest]);
// }

import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import QuestForm from './QuestForm';
import Quest from './Quest';

export default function QuestList() {
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
		<QuestForm addQuest={addQuest}/>
		<List aria-label="main mailbox folders" align="center">
			{
				itemsState.map((quest) => {
					return <Quest quest={quest} key={quest.id} deleteQuest={deleteQuest} updateQuest={updateQuest} />
				})
			}
		</List>
	</>
	);
}



