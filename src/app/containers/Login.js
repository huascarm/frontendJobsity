import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginUser } from '../../redux/actions/AuthAction';
import CloseIcon from '@material-ui/icons/Close';
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
	}
});

function Login(props) {
	const classes = useStyles();
	const { LoginUser, authResult } = props;
	const [ state, setState ] = useState({ email: '', password: '' });
	const [ open, setOpen ] = useState(true);
	function handleChange(ev) {
		setState({ ...state, [ev.target.id]: ev.target.value });
	}
	function handleSubmit(ev) {
		ev.preventDefault();
		LoginUser(state, props.history);
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
								Login
							</Typography>
							<Grid container spacing={4}>
								<Divider className={classes.fullWidth} />
								<Grid item xs={12}>
									<TextField
										label="Email:"
										variant="outlined"
										fullWidth
										required
										type="email"
										onChange={handleChange}
										id="email"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										label="Password:"
										variant="outlined"
										fullWidth
										required
										type="password"
										onChange={handleChange}
										id="password"
									/>
								</Grid>
							</Grid>
						</CardContent>
						<Divider className={classes.fullWidth} />
						<CardActions>
							<Grid container direction="column">
								<Grid container justify="center">
									{authResult !== null && (
										<Snackbar
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'center'
											}}
											open={open}
											autoHideDuration={3000}
											message={authResult}
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
										Send
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
		authResult: state.auth.authResult
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		LoginUser: (data, history) => dispatch(LoginUser(data, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
