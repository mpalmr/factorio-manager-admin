import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './components/app';
// import ProtectedRoute from './components/protected-route';
import Dashboard from './components/dashboard';
import Login from './components/login';
import RegisterUser from './components/register-user';
import Logout from './components/logout';
import NotFound from './components/not-found';

const history = createBrowserHistory();

function Routes() {
	return (
		<Router history={history}>
			<App>
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={RegisterUser} />
					<Route exact path="/logout" component={Logout} />
					<Route component={NotFound} />
				</Switch>
			</App>
		</Router>
	);
}

export default Routes;
