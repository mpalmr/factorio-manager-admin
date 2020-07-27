import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

export const DELETE_GAME_MUTATION = gql`
	mutation DeleteGame($gameId: ID!) {
		deleteGame(gameId: $gameId)
	}
`;

function DeleteGameButton({ gameId }) {
	const [deleteGame, { loading }] = useMutation(DELETE_GAME_MUTATION, {
		variables: { gameId },
		update(cache) {
			cache.modify({
				fields: {
					games(existingGames = []) {
						return existingGames.filter(game => game.id !== gameId);
					},
				},
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
