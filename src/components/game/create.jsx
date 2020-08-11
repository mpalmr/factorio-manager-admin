import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
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
import validation from './validation';
import VersionField from './fields/version';
import { TextField } from '../fields';
import { GAME_COMMON_FRAGMENT } from '../../fragments';

const validationSchema = Yup.object().shape(validation).required();

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
				validationSchema={validationSchema}
				initialValues={{
					name: '',
					version: '',
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
						{console.log(touched, errors)}
						<Row>
							<Col md={6}>
								<TextField
									id="create-game-name"
									name="name"
									label="Name"
									maxLength={40}
									disabled={isSubmitting}
									error={touched.name && errors.name}
								/>
							</Col>
							<Col md={6}>
								<VersionField
									id="create-game-version"
									name="version"
									label="Version"
									disabled={isSubmitting}
									error={touched.version && errors.version}
								/>
							</Col>
						</Row>
						<div className={styles.lowerControls}>
							<Button type="submit" variant="success" disabled={isSubmitting}>
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
