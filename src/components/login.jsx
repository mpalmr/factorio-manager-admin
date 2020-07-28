import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
} from 'react-bootstrap';
import { AuthContext } from '../providers/authentication';
import FormControl from './form-control';

export const LOGIN_MUTATION = gql`
	mutation Login($credentials: CredentialsInput!) {
		createAuthToken(credentials: $credentials)
	}
`;

function Login() {
	const { username, login } = useContext(AuthContext);

	const [loginReq] = useMutation(LOGIN_MUTATION, {
		onCompleted({ createAuthToken }) {
			login(createAuthToken);
		},
	});

	async function onSubmit(values) {
		const authToken = await loginReq({
			variables: { credentials: values },
		})
			.then(({ data }) => data.createAuthToken);
		login(authToken, values.username);
	}

	function validate(values) {
		const errors = {};
		if (!values.username) errors.username = 'Required';
		if (!values.password) errors.password = 'Required';
		return errors;
	}

	return username ? (
		<Redirect to="/" />
	) : (
		<Container>
			<Formik
				initialValues={{ username: '', password: '' }}
				validate={validate}
				onSubmit={onSubmit}
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
								<FormControl
									id="login-username"
									name="username"
									label="Username"
									disabled={isSubmitting}
									touched={!!touched.username}
									error={errors.username}
								/>
							</Col>
							<Col sm={6}>
								<FormControl
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
