import React from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Formik } from 'formik';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
} from 'react-bootstrap';
import TextField from './form/text-field';

export const LOGIN_QUERY = gql`
	query Login($username: String!, $password: String!) {
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

	function validate(values) {
		const errors = {};
		if (!values.username) errors.username = 'Required';
		if (!values.password) errors.password = 'Required';
		return errors;
	}

	return (
		<Container>
			<Formik
				initialValues={{ username: '', password: '' }}
				validate={validate}
				onSubmit={values => login({ variables: values })}
			>
				{({ touched, errors, handleSubmit }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Row>
							<Col sm={6}>
								<TextField
									id="login-username"
									name="username"
									label="Username"
									disabled={disabled}
									touched={touched}
									error={errors.username}
								/>
							</Col>
							<Col sm={6}>
								<TextField
									id="login-password"
									name="password"
									label="Password"
									type="password"
									disabled={disabled}
									touched={touched}
									error={errors.password}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="submit" variant="primary" size="lg" disabled={disabled} block>
									Login
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default Login;
