import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import TextField from '../form/text-field';

const NEW_GAME_FRAGMENT = gql`
	fragment NewGame on Game {
		id
		name
		version
		createdAt
	}
`;

export const CREATE_GAME_MUTATION = gql`
	mutation CreateGame($game: CreateGameInput!) {
		createGame(game: $game) {
			...NewGame
		}
	}
	${NEW_GAME_FRAGMENT}
`;

function CreateGame() {
	const [create] = useMutation(CREATE_GAME_MUTATION, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					games(existingGames = []) {
						return existingGames.concat(cache.writeFragment({
							fragment: NEW_GAME_FRAGMENT,
							data: data.createGame,
						}));
					},
				},
			});
		},
	});

	function validate(values) {
		const errors = {};

		if (!values.name) errors.name = 'Required';
		else if (values.name.length < 3) errors.name = 'Name must be at least three characters';

		return errors;
	}

	async function onSubmit(values, { resetForm }) {
		const result = await create({
			variables: { game: values },
		});
		resetForm();
		return result;
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

CreateGame.fragments = { newGame: NEW_GAME_FRAGMENT };

export default CreateGame;
