import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

export const DELETE_GAME_MUTATION = gql`
	mutation DeleteGame($gameId: ID!) {
		deleteGame(gameId: $gameId)
	}
`;

const GAMES_QUERY = gql`
	query Games {
		games {
			id
		}
	}
`;

function DeleteGameButton({ gameId }) {
	const [deleteGame, { loading }] = useMutation(DELETE_GAME_MUTATION, {
		variables: { gameId },
		update(cache) {
			const { games } = cache.readQuery({ query: GAMES_QUERY });
			return cache.writeQuery({
				query: GAMES_QUERY,
				data: { games: games.filter(game => game.id !== gameId) },
			});
		},
	});

	return (
		<Button variant="danger" size="sm" disabled={loading} onClick={deleteGame}>
			Delete
		</Button>
	);
}

DeleteGameButton.propTypes = { gameId: PropTypes.string.isRequired };

export default DeleteGameButton;
