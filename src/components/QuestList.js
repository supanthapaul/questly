// function pushQuest(quest){
// 	const newQuest={
// 		id:uudiv4(),
// 		...quest,
// 	}
// 	setQuestList([...questList, newQuest]);
// }

import React, {useState} from 'react';
import QuestForm from './QuestForm';

export default function QuestList(){
	const[questList,setQuestList] = useState([]);

	const pushQuest= () =>{

	}
	return(
		<QuestForm/>
	);
}



