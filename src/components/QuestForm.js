import React, { useState } from 'react';
import dayjs from 'dayjs';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import AddIcon from '@material-ui/icons/Add';
import InputAdornment from '@material-ui/core/InputAdornment';


// quest: {
// 	text:"task",
// 	subList: [
// 		{
// 			text: "text",
// 			isCompleted: false
// 		},
// 		{
// 			text: "text",
// 			isCompleted: false
// 		}
// 	],
// 	dueDate: date,
// 	difficulty: 1
//	isCompleted: false
// }	
const useStyles = makeStyles((theme) => ({
	fw: {
		width: '100%',
	},
}));
const INITIAL_QUEST = { text: "", subList: [], dueDate: "", difficulty: 0, isCompleted: false };

export default function QuestForm(props) {
	const classes = useStyles();
	const [quest, setQuest] = useState(INITIAL_QUEST);
	const [subList, setSubList] = useState([]);
	const [dialogueOpen, setDialogueOpen] = useState(false);

	const handleDifficulty = (e, newValue) => {
		setQuest({ ...quest, difficulty: newValue });
	}

	const difficultyMarks = [
		{
			value: 0,
			label: 'Easy',
		},
		{
			value: 1,
			label: 'Medium',
		},
		{
			value: 2,
			label: 'Hard',
		}
	];

	const handleClickOpen = () => {
		if (!dialogueOpen) {
			setDialogueOpen(true);
			console.log("handle open");
			// Set due date to current time
			setQuest({
				...quest,
				dueDate: dayjs().format("YYYY-MM-DDTHH:mm").toString()
			})
		}

	};

	const handleDialogueClose = () => {
		// empty quest state
		setQuest(INITIAL_QUEST);
		setSubList([]);
		setDialogueOpen(false);
	};

	const validateQuestForm = () => {
		let sublistValid = true;
		subList.forEach(item => {
			if(item.text.trim() === "") {
				sublistValid = false;
				return;
			}
		})
		if(quest.text.trim() === "" || !sublistValid) {
			// form isn't valid
			return false;
		}
		// form is valid
		return true;
	}
	const onFormSubmit = () => {
		if(!validateQuestForm())
			return;
		
		const newQuest = {
			...quest,
			subList: [...subList]
		}
		props.addQuest(newQuest);
		handleDialogueClose();
	}

	const addSubList = (e) => {
		e.preventDefault();
		const newSubList = [...subList].filter(item => item.text.trim() !== "");
		newSubList.push({ text: "", isCompleted: false });
		setSubList(newSubList);
	}

	const onSubListItemChange = (index, e) => {
		const newSublist = [...subList];
		newSublist[index].text = e.target.value;
		setSubList(newSublist);
	}


	return (
		<>
			<form autoComplete="off">
				<TextField id="standard-basic" label="Click to start adding a Quest" onClick={handleClickOpen}
					variant="filled" fullWidth disabled />
			</form>

			<Dialog open={dialogueOpen} onClose={handleDialogueClose} 
				fullWidth
				maxWidth="sm" aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Quest</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Enter the task
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						type="text"
						fullWidth
						value={quest.text} onChange={(e) => setQuest({ ...quest, text: e.target.value })} autoComplete="off"
						placeholder="Enter task"
					/>
					<br />
					
					{subList.length == 0 ?
						<>
							<Button fullWidth onClick={addSubList}><AddIcon /> Add Checklist</Button>
						<br />
						</>
					:
						<List component="nav" aria-label="main mailbox folders">
							{subList.map((item, index) => {
								return (
									<ListItem key={index} >
										<form onSubmit={addSubList} className={classes.fw}>
											<TextField size="small" autoFocus
												fullWidth
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<AddIcon />
														</InputAdornment>
													),}}
												value={item.text} onChange={(e) => onSubListItemChange(index, e)}
												placeholder={"Checklist item " + (index + 1)} />
										</form>
										<Divider />
									</ListItem>
								)
							})}
						</List>
					}
					<br />

					<TextField
						id="date"
						label="Due Date"
						type="datetime-local"
						InputLabelProps={{
							shrink: true,
						}}
						value={quest.dueDate}
						onChange={(e) => setQuest({ ...quest, dueDate: e.target.value })}
						fullWidth
					/>
					<br />
					<br />
					<Typography id="discrete-slider" gutterBottom>
						Difficulty
      </Typography>
					<Slider
						defaultValue={0}
						aria-labelledby="discrete-slider"
						valueLabelDisplay="off"
						step={1}
						marks={difficultyMarks}
						min={0}
						max={2}
						value={quest.difficulty}
						onChange={handleDifficulty}
					/>

				</DialogContent>
				<DialogActions>
					<Button onClick={onFormSubmit} color="primary">
						Confirm
					</Button>

				</DialogActions>
			</Dialog>
		</>
	);
}
