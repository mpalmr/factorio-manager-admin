import React from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { isLoggedIn } from '../cache';

const LOGOUT_MUTATION = gql`
	mutation Logout($token: String!) {
		invalidateAuthToken(token: $token)
	}
`;

function LogoutButton() {
	const history = useHistory();
	const client = useApolloClient();

	const [logout, { loading }] = useMutation(LOGOUT_MUTATION, {
		variables: { token: localStorage.getItem('authToken') },
		update() {
			localStorage.clear();
			client.clearStore();
			isLoggedIn(false);
			history.push('/login');
		},
	});

	return (
		<Button disabled={loading} onClick={logout}>Logout</Button>
	);
}

export default LogoutButton;
