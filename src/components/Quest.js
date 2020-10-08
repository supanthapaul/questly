import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import QuestForm from './QuestForm';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));


export default function Quest(props) {
	const [dialogueOpen, setDialogueOpen] = useState(false);
	const [checkedSubList, setCheckedSubList] = useState(false);
	const [openSubList, setOpenSubList] = useState(false);
	const [openOption, setOpenOption] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const classes = useStyles();

	const statsState = useStoreState(state => state.user.stats);
	const authState = useStoreState(state => state.auth.user);
	const startUpdateStats = useStoreActions(actions => actions.user.startUpdateStats);
	const startUpdateQuest = useStoreActions(actions => actions.quests.startUpdateQuest);
	const setQuestError = useStoreActions(actions => actions.quests.setError);

	const handleToggleSubList = () => {
		setOpenSubList(!openSubList);
	};
	// update user stats based on quest completion
	const setUpdatedStats = () => {
		// xp gains on difficulty
		const xpGains = [20, 30, 50];
		let updatedStats = { ...statsState, currXp: statsState.currXp + xpGains[props.quest.difficulty] };
		if (updatedStats.currXp >= updatedStats.limitXp) {
			updatedStats.currXp -= updatedStats.limitXp;
			updatedStats.level += 1;
			updatedStats.limitXp += 25;
			if (updatedStats.limitXp > updatedStats.maxLimit)
				updatedStats.limitXp = updatedStats.maxLimit;
		}
		// update the stats on firebase
		startUpdateStats({
			uid: authState.uid,
			updatedStats: updatedStats
		})
			.then((res) => {
				console.log("Stats update successful")
			})
			.catch((err) => console.log("Stats update failed"))
	}

	const handleToggleQuest = (event) => {
		//setCheckedQuest(event.target.value);
		const newQuest = {
			...props.quest,
			isCompleted: !props.quest.isCompleted
		}
		props.updateQuest(newQuest);
		setUpdatedStats();
	};
	const handleChangeSublist = (event) => {
		setCheckedSubList(event.target.value);
	};

	const handleOpenOptions = (e) => {
		setAnchorEl(e.currentTarget);
		setOpenOption(!openOption);
	}

	const handleCloseOptions = () => {
		setAnchorEl(null);
	};

	const deleteQuest = () => {
		props.deleteQuest(props.quest.id);
		handleCloseOptions();
	}

	const updateQuest = (updatedQuest) => {
		startUpdateQuest(updatedQuest)
			.catch((error) => setQuestError(error));
	}

	return (
		<>
			<ListItem>
				<ListItemIcon>
					<Checkbox
						checked={props.quest.isCompleted}
						onChange={handleToggleQuest}
						color="primary"
					/>
				</ListItemIcon>
				<ListItemText
					primary={props.quest.text}
					secondary={"Due " + dayjs(props.quest.dueDate).format("MMMM D, h:mm A")} />
				<ListItemIcon>
					{[...Array((props.quest.difficulty) + 1).keys()].map((el, index) => {
						console.log("star Icon")
						return <StarRateIcon color="error" key={index} />
					})}
					<IconButton aria-haspopup="true"
						onClick={handleOpenOptions}>
						<MoreVertIcon />
					</IconButton>
				</ListItemIcon>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleCloseOptions}
				>
					<MenuItem onClick={() => {
						handleCloseOptions();
						setDialogueOpen(true)
					}
					}><IconButton><EditIcon /></IconButton>Edit</MenuItem>
					<MenuItem onClick={deleteQuest}><IconButton><DeleteIcon /></IconButton>Delete</MenuItem>
				</Menu>
			</ListItem>
			{props.quest.subList.length > 0 ? <><ListItem button onClick={handleToggleSubList}>
				<ListItemIcon>
					<FilterListIcon />
				</ListItemIcon>
				<ListItemText primary="Checklist" />
				{openSubList ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
				<Collapse in={openSubList} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{props.quest.subList.map((item, index) => {
							return (
								<ListItem button key={index} className={classes.nested}>
									<ListItemIcon>
										<Checkbox
											value={checkedSubList}
											onChange={handleChangeSublist}
											color="secondary"
										/>
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							)
						})}
					</List>
				</Collapse>
			</>
				: null}
			<QuestForm
				dialogTitle="Edit Quest"
				quest={props.quest}
				dialogueOpen={dialogueOpen}
				setDialogueOpen={setDialogueOpen} onFormSubmit={updateQuest} />
			<Divider />
		</>);
}