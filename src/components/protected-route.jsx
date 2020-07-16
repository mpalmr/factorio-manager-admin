import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient, gql } from '@apollo/client';
import { Route, Redirect } from 'react-router-dom';

const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client
	}
`;

function ProtectedRoute({ component: Component, unauthenticated, ...props }) {
	const client = useApolloClient();
	return (
		<Route
			{...props}
			render={componentProps => {
				const { isLoggedIn } = client.cache.readQuery({ query: IS_LOGGED_IN });
				return isLoggedIn && !unauthenticated
					? <Component {...componentProps} />
					: <Redirect to="/login" />;
			}}
		/>
	);
}

ProtectedRoute.propTypes = {
	component: PropTypes.elementType.isRequired,
	unauthenticated: PropTypes.bool,
};
ProtectedRoute.defaultProps = { unauthenticated: false };

export default ProtectedRoute;
