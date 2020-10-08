import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
	title: {
		fontSize: 18,
		textAlign: 'center',
		marginTop: '1rem'
	},
	author: {
		fontSize: 14,
		position: 'absolute',
		right: '3rem',
		bottom: '0.5rem'
	},
	actions: {
		position: 'relative'
	},
	content: {
		padding: '8px'
	},
});

function MotiQuote() {
	const [quote, setQuote] = useState("");
	const classes = useStyles();

	useEffect(() => {
		fetch("https://type.fit/api/quotes")
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				getQuote(data);
				setInterval(getQuote.bind(this, data), 5000);
			});
	}, []);

	function getQuote(myQuotes) {
		let index = Math.floor(Math.random() * myQuotes.length);
		setQuote(myQuotes[index]);
	}


	return (

		<Card variant="outlined">
			<CardContent className={classes.content}>
				<Typography className={classes.title} gutterBottom>
					<i>{quote.text ? (quote.text) : "Loading..."}</i>
				</Typography>
			</CardContent>
			<CardActions className={classes.actions}>
				<Typography className={classes.author} color="textSecondary">
					~{quote.author ? (quote.author) : "Loading..."}
				</Typography>
			</CardActions>
		</Card>

	);
}

export default MotiQuote