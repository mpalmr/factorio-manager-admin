import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
	Form,
	Button,
	Container,
	Row,
	Col,
} from 'react-bootstrap';
import styles from './create.scss';
import VersionField from './fields/version';
import { sharedValidation} from './validation';
import LoadingIndicator from '../loading-indicator';
import { TextField } from '../fields';
import { GAME_COMMON_FRAGMENT } from '../../fragments';

const validationSchema = Yup.object().shape({
	...sharedValidation,
}).required();

export const GAME_QUERY = gql`
	query GameToEdit($gameId: ID!) {
		game(gameId: $gameId) {
			...GameCommon
		}
	}
	${GAME_COMMON_FRAGMENT}
`;

export const UPDATE_GAME_MUTATION = gql`
	mutation UpdateGame($game: UpdateGameInput!) {
		updateGame(game: $game) {
			...GameCommon
		}
	}
	${GAME_COMMON_FRAGMENT}
`;

function EditGame() {
	const routeParams = useParams();

	const { data, loading } = useQuery(GAME_QUERY, {
		variables: { gameId: routeParams.id },
	});

	const [update] = useMutation(UPDATE_GAME_MUTATION, {
		async update(cache, { data: { updateGame } }) {
			cache.modify({
				fields: {
					games(existingGames = []) {
						return existingGames.filter(game => (game.id !== updateGame.id
							? game
							: cache.writeFragment({
								fragment: GAME_COMMON_FRAGMENT,
								data: updateGame,
							})));
					},
				},
			});
		},
	});

	async function onSubmit(values) {
		return update({
			variables: {
				game: {
					id: routeParams.id,
					name: values.name,
				},
			},
		});
	}

	const game = data?.game;

	return loading ? (
		<LoadingIndicator />
	) : (
		<Container>
			<Formik
				validationSchema={validationSchema}
				initialValues={{
					name: game.name,
					version: game.version,
				}}
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
								<TextField
									id="edit-game-name"
									name="name"
									label="Name"
									maxLength={40}
									disabled={isSubmitting}
									error={touched.name && errors.name}
								/>
							</Col>
							<Col md={6}>
								<VersionField
									id="edit-game-version"
									name="version"
									label="Version"
									disabled={isSubmitting}
									error={touched.version && errors.version}
								/>
							</Col>
							<div className={styles.lowerControls}>
								<Button type="submit" variant="success" disabled={isSubmitting}>
									Submit
								</Button>
							</div>
						</Row>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

export default EditGame;
