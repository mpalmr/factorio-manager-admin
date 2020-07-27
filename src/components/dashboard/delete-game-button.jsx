import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import ConfirmationModal from '../confirmation-modal';

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

function DeleteGameButton({ gameId, gameName }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	async function onConfirm() {
		await deleteGame();
		setIsModalOpen(false);
	}

	return (
		<>
			<Button variant="danger" size="sm" disabled={loading} onClick={() => setIsModalOpen(true)}>
				Delete
			</Button>
			<ConfirmationModal
				show={isModalOpen}
				title="Delete Game?"
				onClose={() => setIsModalOpen(false)}
				onConfirm={onConfirm}
			>
				<p>Are you sure you want to delete {gameName}.</p>
			</ConfirmationModal>
		</>
	);
}

DeleteGameButton.propTypes = {
	gameId: PropTypes.string.isRequired,
	gameName: PropTypes.string.isRequired,
};

export default DeleteGameButton;
