import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
} from 'react-bootstrap';
import TextField from './form/text-field';
import { AuthContext } from '../providers/authentication';

export const REGISTRATION_MUTATION = gql`
	mutation RegisterUser($user: CredentialsInput!) {
		createUser(user: $user)
	}
`;

function RegisterUser() {
	const { username, login } = useContext(AuthContext);
	const [register] = useMutation(REGISTRATION_MUTATION);

	async function onSubmit({ confirmPassword, ...user }) {
		await register({
			variables: { user },
		});
		login(user.username);
	}

	function validate(values) {
		const errors = {};

		if (!values.username) errors.username = 'Required';
		else if (values.username.length < 3) {
			errors.username = 'Username must be at least three characters';
		}

		if (!values.password) errors.password = 'Required';
		else if (values.password.length < 6) errors.password = 'Must be at least 6 characters';
		else if (!values.confirmPassword) errors.confirmPassword = 'Required';
		else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	}

	return username ? (
		<Redirect to="/" />
	) : (
		<Container>
			<Formik
				initialValues={{ username: '', password: '', confirmPassword: '' }}
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
								<TextField
									id="register-username"
									name="username"
									label="Username"
									maxLength={40}
									disabled={isSubmitting}
									touched={!!touched.username}
									error={errors.username}
								/>
							</Col>
						</Row>
						<Row>
							<Col sm={6}>
								<TextField
									id="register-password"
									name="password"
									label="Password"
									type="password"
									disabled={isSubmitting}
									touched={!!touched.password}
									error={errors.password}
								/>
							</Col>
							<Col sm={6}>
								<TextField
									id="register-confirm-password"
									name="confirmPassword"
									label="Confirm Password"
									type="password"
									disabled={isSubmitting}
									touched={!!touched.confirmPassword}
									error={errors.confirmPassword}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="submit" variat="primary" size="lg" disabled={isSubmitting} block>
									Register
								</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default RegisterUser;
