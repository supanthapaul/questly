import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterListIcon from '@material-ui/icons/FilterList';
import { makeStyles } from '@material-ui/core/styles';
import StarRateIcon from '@material-ui/icons/StarRate';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
	const [checkedSubList, setCheckedSubList] = useState(false);
	const [openSubList, setOpenSubList] = useState(false);
	const [openOption, setOpenOption] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);


	const classes = useStyles();
	const handleToggleSubList = () => {
		setOpenSubList(!openSubList);
	};

	const handleToggleQuest = (event) => {
		//setCheckedQuest(event.target.value);
		const newQuest = {
			...props.quest,
			isCompleted: !props.quest.isCompleted
		}
		props.updateQuest(newQuest)
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
				<ListItemText primary={props.quest.text} />
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
					<MenuItem onClick={handleCloseOptions}><IconButton><EditIcon /></IconButton>Edit</MenuItem>
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

			<Divider />
		</>);
}