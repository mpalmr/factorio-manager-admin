import React from 'react';
import { useMutation } from '@apollo/react-hooks';
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

const REGISTRATION_MUTATION = gql`
	mutation RegisterUser($user: CredentialsInput!) {
		createUser(user: $user)
	}
`;

function RegisterUser() {
	const [register, { loading }] = useMutation(REGISTRATION_MUTATION);

	function validate(values) {
		const errors = {};

		if (!values.username) errors.username = 'Required';
		else if (!values.username.length < 3) {
			errors.username = 'Username must be at least three characters';
		} else if (errors.username.length > 40) {
			errors.username = 'Username must be less than 40 characters';
		}

		if (!values.password) errors.username = 'Required';
		else if (values.password.length < 6) errors.password = 'Must be at least 6 characters';
		else if (!values.confirmPassword) errors.confirmPassword = 'Required';
		else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	}

	return (
		<Container>
			<Formik
				initialValues={{ username: '', password: '' }}
				validate={validate}
				onSubmit={values => register({ variables: values })}
			>
				{({ touched, errors, handleSubmit }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<Row>
							<Col sm={6}>
								<TextField
									id="register-username"
									name="username"
									label="Username"
									disabled={loading}
									touched={touched}
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
									disabled={loading}
									touched={touched}
									error={errors.password}
								/>
							</Col>
							<Col sm={6}>
								<TextField
									id="register-confirm-password"
									name="confirm-password"
									label="Confirm Password"
									type="password"
									disabled={loading}
									touched={touched}
									error={errors.confirmPassword}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="submit" variat="primary" size="lg" disabled={loading} block>Register</Button>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default RegisterUser;
