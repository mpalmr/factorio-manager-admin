import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
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
	mutation Login($credentials: CredentialsInput!) {
		createAuthToken(credentials: $credentials)
	}
`;

function Login() {
	const history = useHistory();

	const [login] = useMutation(LOGIN_QUERY, {
		onCompleted({ createAuthToken }) {
			localStorage.setItem('authToken', createAuthToken);
			history.push('/');
		},
	});

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
				onSubmit={values => login({
					variables: { credentials: values },
				})}
			>
				{({
					touched,
					errors,
					isSubmitting,
					handleSubmit,
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Row>
							<Col sm={6}>
								<TextField
									id="login-username"
									name="username"
									label="Username"
									disabled={isSubmitting}
									touched={!!touched.username}
									error={errors.username}
								/>
							</Col>
							<Col sm={6}>
								<TextField
									id="login-password"
									name="password"
									label="Password"
									type="password"
									disabled={isSubmitting}
									touched={!!touched.password}
									error={errors.password}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="submit" variant="primary" size="lg" disabled={isSubmitting} block>
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
