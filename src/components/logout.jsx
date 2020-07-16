import React, { useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client
	}
`;

function Logout() {
	const client = useApolloClient();
	const history = useHistory();

	useEffect(() => {
		client.cache.writeQuery({
			query: IS_LOGGED_IN,
			data: { isLoggedIn: false },
		});
		localStorage.clear();
		history.push('/');
	}, []);

	return (
		<p>Logging out...</p>
	);
}

export default Logout;
