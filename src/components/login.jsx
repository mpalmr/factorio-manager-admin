import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import { Container, Button, Form } from 'react-bootstrap';

const LOGIN_QUERY = gql`
	mutation Login($username: String!, $password: String!) {
		authToken(username: $username, password: $password)
	}
`;

function Login() {
	const [login, query] = useLazyQuery(LOGIN_QUERY, {
		onCompleted({ authToken }) {
			localStorage.setItem('authToken', authToken);
		},
	});

	const disabled = query.called && query.loading;

	function handleSubmit(values) {
		return login({ variables: values });
	}

	return (
		<Container>
			<Formik initialValues={{ username: '', password: '' }} onSubmit={handleSubmit}>
				<Form.Group controlId="login-username">
					<Form.Label>Username</Form.Label>
					<Field as={Form.Control} name="username" type="text" disabled={disabled} />
				</Form.Group>
				<Form.Group controlId="login-password">
					<Form.Label>Password</Form.Label>
					<Field as={Form.Control} name="password" type="password" disabled={disabled} />
				</Form.Group>
				<Button type="submit" variant="primary" size="lg" disabled={disabled} block>Login</Button>
			</Formik>
		</Container>
	);
}

export default Login;
