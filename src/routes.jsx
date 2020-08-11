import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/private-route';
import App from './components/app';
import Dashboard from './components/dashboard';
import Login from './components/login';
import RegisterUser from './components/register-user';
import CreateGame from './components/game/create';
import EditGame from './components/game/edit';
import NotFound from './components/not-found';

function Routes() {
	return (
		<Router>
			<App>
				<Switch>
					<Route exact path="/">
						<Dashboard />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/register">
						<RegisterUser />
					</Route>
					<PrivateRoute exact path="/game/new">
						<CreateGame />
					</PrivateRoute>
					<PrivateRoute exact path="/game/:id">
						<EditGame />
					</PrivateRoute>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</App>
		</Router>
	);
}

export default Routes;
