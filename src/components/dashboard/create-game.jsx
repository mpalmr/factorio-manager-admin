import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import TextField from '../form/text-field';

export const CREATE_GAME = gql`
	mutation CreateGame($game: CreateGameInput!) {
		createGame(game: $game) {
			id
			name
			version
			isOnline
			creator {
				id
				username
			}
			createdAt
		}
	}
`;

function CreateGame() {
	const [create] = useMutation(CREATE_GAME);

	function validate(values) {
		const errors = {};

		if (!values.name) errors.name = 'Required';
		else if (values.name.length < 3) errors.name = 'Name must be at least three characters';

		return errors;
	}

	return (
		<Formik
			initialValues={{ name: '' }}
			validate={validate}
			onSubmit={values => create({
				variables: { game: values },
			})}
		>
			{({
				isSubmitting,
				touched,
				errors,
				handleSubmit,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<TextField
						id="create-game-name"
						name="name"
						label="Name"
						maxLength={40}
						disabled={isSubmitting}
						touched={!!touched.name}
						error={errors.name}
					/>
					<Button type="submit" variant="primary" size="lg" disabled={isSubmitting} block>
						Create Game
					</Button>
				</Form>
			)}
		</Formik>
	);
}

export default CreateGame;
