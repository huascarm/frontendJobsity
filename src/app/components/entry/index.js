import React, { useState, useEffect, Fragment } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import HttpService from '../../../redux/services/HttpService';
import {
	Grid,
	Card,
	CardActions,
	Button,
	CardContent,
	IconButton,
	Snackbar,
	TextField,
	Typography
} from '@material-ui/core';

export default function Entry(props) {
	const idPost = props.match.params.id;
	const [ state, setState ] = useState({
		title: '...',
		content: '...',
		editor: false
	});
	const [ open, setOpen ] = useState(true);
	const [ disabled, setDisabled ] = useState(true);
	function closeSnack() {
		setOpen(false);
	}

	const [ delMsg, setDelMsg ] = useState(null);

	useEffect(() => {
		HttpService.getApi('/entries/' + idPost)
			.then((res) => {
				console.log('getting', res);
				const { title, content, created_at, updated_at } = res.data;
				setState({
					title,
					content,
					created_at,
					updated_at,
					editor: true
				});
			})
			.catch((err) => {
				window.location.href = '/';
			});
	}, []);

	const handleDelete = () => {
		setOpen(true);
		HttpService.deleteApi('/entries/' + idPost).then((res) => {
			console.log(res);
			if (res.success) {
				setTimeout(() => {
					window.location.href = '/';
				}, 1000);
			}
			setDelMsg(res.message);
		});
	};

	const handleEdit = () => {
		setDisabled(!disabled);
	};

	function handleChange(ev) {
		setState({ ...state, [ev.target.id]: ev.target.value });
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		HttpService.patchApi('/entries/' + idPost).then((res) => {
			console.log(res);
			setDelMsg(res.message);
		});
		setTimeout(() => {
			setOpen(true);
		}, 500);
	}

	const { title, content, editor } = state;
	return (
		<Grid container justify="center" alignItems="center" style={{ height: '90vh' }}>
			<Grid item xs={12} md={10} lg={8}>
				{editor && (
					<Grid container justify="center" style={{ marginBottom: '24px' }}>
						<Button
							onClick={handleDelete}
							variant="contained"
							size="large"
							color="primary"
							style={{ marginRight: '48px' }}
						>
							Delete
						</Button>
						<Button variant="contained" size="large" color="primary" onClick={handleEdit}>
							Edit
						</Button>
					</Grid>
				)}
				<Card>
					<form onSubmit={handleSubmit}>
						<CardContent>
							{disabled && (
								<Fragment>
									<Typography gutterBottom variant="h5" component="h2">
										{title}
									</Typography>
									<Typography variant="body2" color="textSecondary" component="p">
										{content}
									</Typography>
								</Fragment>
							)}
							{!disabled && (
								<Fragment>
									<TextField
										disabled={disabled}
										label="Title"
										variant="outlined"
										fullWidth
										required
										onChange={handleChange}
										id="title"
										value={title}
										style={{ margin: '20px 0 40px' }}
									/>

									<TextField
										disabled={disabled}
										label="Content:"
										variant="outlined"
										fullWidth
										required
										onChange={handleChange}
										id="content"
										size="small"
										value={content}
									/>
								</Fragment>
							)}
						</CardContent>
						{!disabled && (
							<CardActions>
								<Button size="small" color="primary" onClick={handleEdit}>
									Cancel
								</Button>
								<Button size="small" color="primary" type="submit">
									Save
								</Button>
							</CardActions>
						)}
					</form>

					{delMsg !== null && (
						<Snackbar
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center'
							}}
							open={open}
							autoHideDuration={3000}
							message={delMsg}
							action={
								<Fragment>
									<IconButton size="small" aria-label="close" color="inherit" onClick={closeSnack}>
										<CloseIcon fontSize="small" />
									</IconButton>
								</Fragment>
							}
						/>
					)}
				</Card>
			</Grid>
		</Grid>
	);
}
