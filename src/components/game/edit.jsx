import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../loading-indicator';
import { GAME_COMMON_FRAGMENT } from '../../fragments';
import { gamePropType } from '../../prop-types';

const GAME_QUERY = gql`
	query GameToEdit($gameId: ID!) {
		game(gameId: $gameId) {
			...GameCommon
		}
	}
	${GAME_COMMON_FRAGMENT}
`;

function EditGame({ game }) {
	const routeParams = useParams();
	const [getGame, { loading }] = useLazyQuery(GAME_QUERY, {
		variables: { gameId: routeParams.id },
	});

	if (!game && !loading) getGame();

	return loading ? (
		<LoadingIndicator />
	) : (
		<p />
	);
}

EditGame.propTypes = { game: gamePropType };
EditGame.defaultProps = { game: null };

export default EditGame;
