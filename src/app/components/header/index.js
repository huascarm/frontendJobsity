import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Toolbar, Button, AppBar, Container, ButtonGroup } from '@material-ui/core';
import ProfileOptions from './profile';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		color: 'white',
		textDecoration: 'none'
	}
}));

function ButtonAppBar(props) {
	const classes = useStyles();
	const { authResult } = props;
	let token = localStorage.getItem('userToken');
	const [ session, setSession ] = useState(token !== null);
	useEffect(
		() => {
			token = localStorage.getItem('userToken');
			setSession(token !== null);
		},
		[ authResult ]
	);
	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Container maxWidth="lg">
					<Toolbar>
						<Link to={'/'} className={classes.title}>
							<Typography variant="h5">Jobsity</Typography>
						</Link>
						{session ? (
							<Fragment>
								<Button variant="contained" component={Link} to={'/addNewEntry'} color="secondary">
									<AddIcon />
									Add new entry
								</Button>
								<ProfileOptions />
							</Fragment>
						) : (
							<ButtonGroup variant="text" color="inherit" aria-label="text primary button group">
								<Button component={Link} to={'/login'}>
									Login
								</Button>
								<Button component={Link} to={'/register'}>
									Sign Up
								</Button>
							</ButtonGroup>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		authResult: state.auth.authResult
	};
};

export default connect(mapStateToProps)(ButtonAppBar);
