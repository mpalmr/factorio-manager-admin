import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	Container,
	Row,
	Col,
	Button,
	Form,
} from 'react-bootstrap';
import FormControl from './form-control';
import { AuthContext } from '../providers/authentication';

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Required').email().min(3),
	password: Yup.string().required('Required').min(6),
	confirmPassword: Yup.string()
		.required('Required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
}).required();

export const REGISTRATION_MUTATION = gql`
	mutation RegisterUser($user: CredentialsInput!) {
		createUser(user: $user)
	}
`;

function RegisterUser() {
	const { username, login } = useContext(AuthContext);
	if (username) return <Redirect to="/" />;
	const [register] = useMutation(REGISTRATION_MUTATION);

	async function onSubmit({ confirmPassword, ...user }) {
		await register({
			variables: { user },
		});
		login(user.username);
	}

	return (
		<Container>
			<Formik
				initialValues={{ username: '', password: '', confirmPassword: '' }}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({
					touched,
					errors,
					isSubmitting,
					handleSubmit,
				}) => (
					<Form noValidate onSubmit={handleSubmit}>
						{console.log(errors)}
						<Row>
							<Col sm={6}>
								<FormControl
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
								<FormControl
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
								<FormControl
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
