import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import {
	Form,
	Button,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import styles from './create.scss';
import VersionField from './fields/version';
import { TextField } from '../fields';
import { GAME_COMMON_FRAGMENT } from '../../fragments';

export const CREATE_GAME_MUTATION = gql`
	mutation CreateGame($game: CreateGameInput!) {
		createGame(game: $game) {
			...GameCommon
		}
	}
	${GAME_COMMON_FRAGMENT}
`;

function CreateGame() {
	const history = useHistory();

	const [create] = useMutation(CREATE_GAME_MUTATION, {
		update(cache, { data: { createGame } }) {
			cache.modify({
				fields: {
					games(existingGames = []) {
						return existingGames.concat(cache.writeFragment({
							fragment: GAME_COMMON_FRAGMENT,
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
			variables: { game: values },
		});
		history.push('/');
		return result;
	}

	return (
		<Container>
			<Formik
				noValidate
				validate={validate}
				onSubmit={onSubmit}
				initialValues={{
					name: '',
					version: '',
				}}
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
								<TextField
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
								<VersionField
									id="create-game-version"
									name="version"
									label="Version"
									disabled={isSubmitting}
									touched={!!touched.version}
									error={errors.version}
								/>
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
