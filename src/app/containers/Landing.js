import React, { useEffect, useState } from 'react';
import { Grid, Typography, ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Post from '../components/post';
import HttpService from '../../redux/services/HttpService';
const useStyles = makeStyles((theme) => ({
	root: {
		height: '90vh'
	},
	scrollable: {
		overflowY: 'auto',
		overflowX: 'hidden',
		maxHeight: '85vh',
		marginBottom: '10px'
	},
	right: {
		marginRight: '16px'
	}
}));

export default function Landing() {
	const classes = useStyles();
	const [ posts, setPosts ] = useState([]);
	useEffect(() => {
		HttpService.getApi('/entries').then((results) => {
			console.log(results);
			setPosts(results.data);
		});
	}, []);
	return (
		<Grid container direction="column" justify="space-between" className={classes.root}>
			<Grid container spacing={4} justify="space-between" className={classes.scrollable}>
				{posts.map((p) => (
					<Post
						id={p.id}
						title={p.title}
						content={p.content}
						updated_at={p.updated_at}
						username={p.username}
						key={p.id}
					/>
				))}
				<Post />
			</Grid>
			<Grid container justify="flex-end" alignItems="center">
				<Typography className={classes.right}>Pagina 1 de 10</Typography>
				<ButtonGroup size="small" aria-label="small outlined button group">
					<Button>
						<ChevronLeftIcon />
					</Button>
					<Button>
						<ChevronRightIcon />
					</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
	);
}
