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
	const [checkedQuest, setCheckedQuest] = useState(true);
	const [checkedSubList, setCheckedSubList] = useState(false);
	const [openSubList, setOpenSubList] = useState(false);
	const [openOption, setOpenOption] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);


	const handleClickOptions = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const classes = useStyles();
	const handleToggleSubList = () => {
		setOpenSubList(!openSubList);
	};

	const handleChangeQuest = (event) => {
		setCheckedQuest(event.target.value);
	};
	const handleChangeSublist = (event) => {
		setCheckedSubList(event.target.value);
	};

	const handleOptions = () => {
		setOpenOption(!openOption);
	}

	const handleCloseOptions = () => {
		setAnchorEl(null);
	};

	const deleteQuest = () =>{
		props.deleteQuest(props.quest.id);
		handleCloseOptions();
	}

	return (
		<>
			<ListItem>
				<ListItemIcon>
					<Checkbox
						value={checkedQuest}
						onChange={handleChangeQuest}
						color="primary"
					/>
				</ListItemIcon>
				<ListItemText primary={props.quest.text} />
				<ListItemIcon>
	{[...Array((props.quest.difficulty)+1).keys()].map((el,index)=>{
		console.log("star Icon")
		return <StarRateIcon key={index}/>
		})}
				<IconButton aria-haspopup="true"
					onClick={handleOptions}>
					<MoreVertIcon onClick={handleClickOptions} />
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
			{props.quest.subList.length>0 ?<><ListItem button onClick={handleToggleSubList}>
				<ListItemIcon>
					<FilterListIcon />
				</ListItemIcon>
				<ListItemText primary="Checklist" />
				{openSubList ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={openSubList} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{props.quest.subList.map((item) => {
						return(
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<Checkbox
									value={checkedSubList}
									onChange={handleChangeSublist}
									color="primary"
								/>
							</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
						)
					})}
				</List>
			</Collapse>
			</>
			:null}
			
			<Divider />
		</>);
}