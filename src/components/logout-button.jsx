import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LOGOUT_MUTATION = gql`
	mutation Logout($token: String!) {
		invalidateAuthToken(token: $token)
	}
`;

function LogoutButton({ logout }) {
	const history = useHistory();

	const [reqLogout, { loading }] = useMutation(LOGOUT_MUTATION, {
		variables: { token: localStorage.getItem('authToken') },
		onCompleted() {
			logout();
			history.push('/login');
		},
		onError() {
			logout();
		},
	});

	return (
		<Button disabled={loading} onClick={reqLogout}>Logout</Button>
	);
}

LogoutButton.propTypes = { logout: PropTypes.func.isRequired };

export default LogoutButton;
