import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import TextField from '../form/text-field';

const CREATE_GAME_FRAGMENT = gql`
	fragment NewGame on Game {
		id
		name
		version
		isOnline
		createdAt
	}
`;

export const CREATE_GAME = gql`
	mutation CreateGame($game: CreateGameInput!) {
		createGame(game: $game) {
			...NewGame
			creator {
				id
				username
			}
		}
	}
	${CREATE_GAME_FRAGMENT}
`;

function CreateGame() {
	const [create] = useMutation(CREATE_GAME, {
		update(cache, { data }) {
			cache.modify({
				fields: {
					games(existingGames = []) {
						return existingGames.concat(cache.writeFragment({
							data: data.createGame,
							fragment: gql`
								fragment NewGame on Game {
									id
									name
									version
									isOnline
									createdAt
								}
							`,
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

	function onSubmit(values, { resetForm }) {
		return create({
			variables: { game: values },
		})
			.then(result => {
				resetForm();
				return result;
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
