import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
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


// quest: {
// 	text:"task",
// 	subList: [
// 		{
// 			text: "text",
// 			completed: false
// 		},
// 		{
// 			text: "text",
// 			completed: false
// 		}
// 	],
// 	dueDate: date,
// 	difficulty: 1
//	isCompleted: false
// }	


export default function QuestForm() {
	const [quest, setQuest] = useState({ text: "", subList: [], dueDate: "2020-05-24", difficulty: 0, isCompleted: false });
	const [subList, setSubList] = useState([{ text: "", completed: false }]);
	const [open, setOpen] = useState(false);

	const handleDifficulty = (e, newValue) => {
		console.log(e.target.value);
		setQuest({ ...quest, difficulty: newValue });
	}

	const handleChange = (event, index) => {
		const newSubList = [...subList];
		newSubList[index].completed = !newSubList[index].completed;
		setSubList(newSubList);
	};

	const marks = [
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
		if (!open) {
			setOpen(true);
			console.log("handle open");
		}

	};

	const handleClose = () => {
		setOpen(false);
		console.log("handle close");
		console.log(open);
		onFormSubmit();
	};

	const onFormSubmit = () => {
		console.log("form submit");
	}

	const addSubList = (e) => {
		console.log("add sublist");
		e.preventDefault();
		const newSubList = [...subList];
		newSubList.push({ text: "", completed: false });
		setSubList(newSubList);
	}

	const onSubListItemChange = (index, e) => {
		console.log("onSubListItemChange(");
		const newSublist = [...subList];
		newSublist[index].text = e.target.value;
		setSubList(newSublist);
	}


	return (
		<>
			<form autoComplete="off">
				<TextField id="standard-basic" label="Click to add Quest" onClick={handleClickOpen}
					variant="filled" fullWidth disabled/>
			</form>

			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
					<List component="nav" aria-label="main mailbox folders">
						{subList.map((item, index) => {
							return (
								<ListItem key={index}>
									<Checkbox
										checked={item.completed}
										color="primary"
										onChange={(e) => handleChange(e, index)}
									/>
									<form onSubmit={addSubList}>
										<TextField autoFocus value={item.text} onChange={(e) => onSubListItemChange(index, e)}
											placeholder={"Checklist item " + (index + 1)} />
									</form>
									<Divider />
								</ListItem>
							)
						})}
					</List>
					<br />

					<TextField
						id="date"
						label="Due Date"
						type="date"
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
						marks={marks}
						min={0}
						max={2}
						value={quest.difficulty}
						onChange={handleDifficulty}
					/>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Confirm
					</Button>

				</DialogActions>
			</Dialog>
		</>
	);
}
