import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
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
import { AuthContext } from '../providers/authentication';
import FormControl from './form-control';

export const LOGIN_MUTATION = gql`
	mutation Login($credentials: CredentialsInput!) {
		createAuthToken(credentials: $credentials)
	}
`;

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Required'),
	password: Yup.string().required('Required'),
}).required();

function Login() {
	const { username, login } = useContext(AuthContext);
	if (username) return <Redirect to="/" />;

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

	return (
		<Container>
			<Formik
				initialValues={{ username: '', password: '' }}
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
