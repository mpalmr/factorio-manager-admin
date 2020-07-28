import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import Select from 'react-select';
import {
	Form,
	Button,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import styles from './create-game.scss';
import FormControl from './form-control';

const NEW_GAME_FRAGMENT = gql`
	fragment NewGame on Game {
		id
		name
		version
		createdAt
	}
`;

export const AVAILABLE_VERSIONS_QUERY = gql`
	query AvailableVersions {
		availableVersions
	}
`;

export const CREATE_GAME_MUTATION = gql`
	mutation CreateGame($game: CreateGameInput!) {
		createGame(game: $game) {
			id
			name
			version
			createdAt
		}
	}
	${NEW_GAME_FRAGMENT}
`;

function CreateGame() {
	const [version, setVersion] = useState('latest');
	const { data } = useQuery(AVAILABLE_VERSIONS_QUERY);

	const [create] = useMutation(CREATE_GAME_MUTATION, {
		update(cache, { data: { createGame } }) {
			cache.modify({
				fields: {
					games(existingGames = []) {
						return existingGames.concat(cache.writeFragment({
							fragment: NEW_GAME_FRAGMENT,
							data: createGame,
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
			variables: {
				game: {
					...values,
					version,
				},
			},
		});
		resetForm();
		return result;
	}

	const availableVersionOptions = (data?.availableVersions || [])
		.map(a => ({ value: a, label: a }));

	return (
		<Container>
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
						<Row>
							<Col md={6}>
								<FormControl
									id="create-game-name"
									name="name"
									label="Name"
									maxLength={40}
									disabled={isSubmitting}
									touched={!!touched.name}
									error={errors.name}
								/>
							</Col>
							<Col md={6}>
								{availableVersionOptions.length === 0 ? (
									<p>Loading...</p>
								) : (
									<FormControl
										id="create-game-version"
										component={Select}
										name="version"
										label="Version"
										disabled={isSubmitting}
										touched={!!touched.version}
										error={errors.version}
										options={availableVersionOptions}
										defaultValue={availableVersionOptions[0]}
										onChange={setVersion}
									/>
								)}
							</Col>
						</Row>
						<div className={styles.lowerControls}>
							<Button
								type="submit"
								variant="success"
								size="lg"
								disabled={isSubmitting}
								onClick={handleSubmit}
							>
								Create Game
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default CreateGame;
