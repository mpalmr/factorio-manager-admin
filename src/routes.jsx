import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './components/app';
import Dashboard from './components/dashboard';
import Login from './components/login';
import RegisterUser from './components/register-user';

const history = createBrowserHistory();

function Routes() {
	return (
		<Router history={history}>
			<App>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={RegisterUser} />
				</Switch>
			</App>
		</Router>
	);
}

export default Routes;
