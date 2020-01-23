import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { addEntry } from '../../redux/actions/EntryAction';
import { toText } from '../../utils/toString';
import {
	Grid,
	Card,
	CardActions,
	CardContent,
	Button,
	Typography,
	TextField,
	Divider,
	Snackbar,
	IconButton
} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		height: '90vh'
	},
	fullWidth: {
		width: '100%'
	},
	title: {
		marginBottom: '24px',
		textAlign: 'center'
	},
	at: {
		marginRight: '-42px',
		marginLeft: '10px'
	},
	textFieldFormLabel: {
		transform: 'translate(48px, 20px) scale(1)'
	}
});

function AddEntry(props) {
	const classes = useStyles();
	const [ state, setState ] = useState({
		title: '',
		content: ''
	});
	const [ open, setOpen ] = useState(true);
	const { add, entryResult } = props;

	function handleChange(ev) {
		setState({
			...state,
			[ev.target.id]: ev.target.value
		});
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		add(state, props.history);
		setTimeout(() => {
			setOpen(true);
		}, 500);
	}

	function closeSnack() {
		setOpen(false);
	}

	return (
		<Grid container justify="center" alignItems="center" className={classes.root}>
			<Grid item xs={12} sm={10} md={6}>
				<Card>
					<form onSubmit={handleSubmit}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
								Create an Entry
							</Typography>
							<Grid container spacing={4}>
								<Divider className={classes.fullWidth} />
								<Grid item xs={12}>
									<TextField
										label="Title:"
										variant="outlined"
										fullWidth
										required
										id="title"
										onChange={handleChange}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										label="Content:"
										variant="outlined"
										fullWidth
										required
										id="content"
										onChange={handleChange}
										multiline
										rows="4"
									/>
								</Grid>
							</Grid>
						</CardContent>
						<Divider className={classes.fullWidth} />
						<CardActions>
							<Grid container direction="column">
								<Grid container justify="center">
									{entryResult && (
										<Snackbar
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'center'
											}}
											open={open}
											autoHideDuration={3000}
											message={toText(entryResult)}
											action={
												<React.Fragment>
													<IconButton
														size="small"
														aria-label="close"
														color="inherit"
														onClick={closeSnack}
													>
														<CloseIcon fontSize="small" />
													</IconButton>
												</React.Fragment>
											}
										/>
									)}
								</Grid>
								<Grid container justify="center">
									<Button size="small" color="primary" component={Link} to="/">
										Cancel
									</Button>
									<Button size="small" color="primary" type="submit">
										Publish
									</Button>
								</Grid>
							</Grid>
						</CardActions>
					</form>
				</Card>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = (state) => {
	return {
		entryResult: state.entries.entryResult
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		add: (data, history) => dispatch(addEntry(data, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
