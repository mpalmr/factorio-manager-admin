import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import TextField from '../form/text-field';

export const CREATE_GAME_MUTATION = gql`
	mutation CreateGame($game: CreateGameInput!) {
		createGame(game: $game) {
			id
			name
			version
			createdAt
		}
	}
`;

function CreateGame() {
	const [create] = useMutation(CREATE_GAME_MUTATION, {});

	function validate(values) {
		const errors = {};

		if (!values.name) errors.name = 'Required';
		else if (values.name.length < 3) errors.name = 'Name must be at least three characters';

		return errors;
	}

	async function onSubmit(values) {
		return create({
			variables: { game: values },
		});
	}

	return (
		<Formik
			initialValues={{ name: '' }}
			validate={validate}
			onSubmit={onSubmit}
		>
			{({
				isSubmitting,
				touched,
				errors,
				handleSubmit,
			}) => (
				<Form onSubmit={handleSubmit}>
					<TextField
						id="create-game-name"
						name="name"
						label="Name"
						maxLength={40}
						disabled={isSubmitting}
						touched={!!touched.name}
						error={errors.name}
					/>
					<Button
						type="submit"
						variant="success"
						size="lg"
						disabled={isSubmitting}
						onClick={handleSubmit}
					>
						Create Game
					</Button>
				</Form>
			)}
		</Formik>
	);
}

export default CreateGame;
