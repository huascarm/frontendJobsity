import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import { Link } from 'react-router-dom';
import { Card, Grid, CardHeader, CardContent, CardActions, Avatar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export default function Post(props) {
	const classes = useStyles();
	const { id, title, content, updated_at, username, user_id } = props;
	let initial = ((username || '').charAt(0) || '').toUpperCase();
	const handleUser = () => {
		window.location.href = '/profile/' + user_id;
	};

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardHeader
					onClick={handleUser}
					avatar={
						<Avatar aria-label="recipe" className={classes.avatar}>
							{initial}
						</Avatar>
					}
					title={username}
					subheader={updated_at}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{content}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<Button size="small" color="primary" component={Link} to={'/entry/' + id}>
						See more
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}
