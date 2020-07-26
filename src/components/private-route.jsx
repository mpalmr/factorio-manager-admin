import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../providers/authentication';

function PrivateRoute({ children, ...props }) {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<Route
			{...props}
			render={() => (isLoggedIn ? children : (
				<Redirect to="/login" />
			))}
		/>
	);
}

PrivateRoute.propTypes = { children: PropTypes.node.isRequired };

export default PrivateRoute;
