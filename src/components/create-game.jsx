import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
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
import LoadingIndicator from './loading-indicator';

const NEW_GAME_FRAGMENT = gql`
	fragment NewGame on Game {
		id
		name
		isOnline
		version
		port
		createdAt
		creator {
			id
			username
		}
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
			...NewGame
		}
	}
	${NEW_GAME_FRAGMENT}
`;

function CreateGame() {
	const history = useHistory();
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

		const isPortInRange = values.port < 1024 || values.port > 65535;
		if (values.port && Number.isInteger(values.port) && isPortInRange) {
			errors.port = 'Must be a whole number between 2014 and 65535';
		}

		return errors;
	}

	async function onSubmit(values) {
		const result = await create({
			variables: {
				game: {
					...values,
					version,
				},
			},
		});
		history.push('/');
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
				noValidate
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
									<LoadingIndicator />
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
										onChange={({ value }) => setVersion(value)}
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
