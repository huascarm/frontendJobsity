import React, { useEffect, useState } from 'react';
import { Grid, CardMedia, Card, CardContent, Typography } from '@material-ui/core';
import HttpService from '../../redux/services/HttpService';
import Post from '../components/post';

export default function Profile(props) {
	const idUser = props.match.params.id;

	const [ user, setUser ] = useState({
		username: '...',
		email: '...',
		twitter: '...'
	});

	const [ posts, setPosts ] = useState([]);
	useEffect(() => {
		getUser();
		getPosts();
	}, []);

	function getUser() {
		HttpService.getApi('/user/info/' + idUser).then((results) => {
			console.log('User', results);
			setUser(results.data);
		});
	}
	function getPosts() {
		HttpService.getApi('/user/userPosts/' + idUser).then((results) => {
			console.log('posts', results);
			setPosts(results.data);
		});
	}

	return (
		<Grid container justify="center">
			<Card style={{ minWidth: '500px', marginBottom: '50px' }}>
				<CardMedia
					image="https://pm1.narvii.com/7271/74a55b4a17fa1c169067e77a4fc499dfa4626de6r1-576-644v2_hq.jpg"
					title={user ? user.username : ''}
				/>
				<CardContent>
					<Typography variant="h3" color="textSecondary" align="center">
						{user ? user.username : ''}
					</Typography>
					<Typography variant="h5" color="textSecondary" align="center">
						{user ? user.email : ''}
					</Typography>
					<Typography variant="h6" color="textSecondary" align="center">
						Twitter: @{user ? user.twitter : ''}
					</Typography>
				</CardContent>
			</Card>

			<Grid container spacing={4} justify="space-between">
				{posts &&
					posts.map((p) => (
						<Post
							id={p.id}
							title={p.title}
							content={p.content}
							updated_at={p.updated_at}
							username={user.username}
							key={p.id}
						/>
					))}
			</Grid>
		</Grid>
	);
}
