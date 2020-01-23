import React from 'react';
import Header from './app/components/header';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './app/containers/Landing';
import Login from './app/containers/Login';
import Register from './app/containers/Register';
import Profile from './app/containers/Profile';
import { CanRoute } from './app/components/others/canRoute';
import AddEntry from './app/containers/AddEntry';
import Entry from './app/components/entry';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Container maxWidth="lg" style={{ marginTop: '24px' }}>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<CanRoute path="/profile" component={Profile} />
					<CanRoute path="/addNewEntry" component={AddEntry} />
					<Route path="/entry/:id" component={Entry} />
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
