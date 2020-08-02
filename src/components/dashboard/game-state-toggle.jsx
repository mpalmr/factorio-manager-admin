import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

export const START_GAME_MUTATION = gql`
	mutation StartGame($gameId: ID!) {
		startGame(gameId: $gameId) {
			id
			isOnline
		}
	}
`;

export const STOP_GAME_MUTATION = gql`
	mutation StopGame($gameId: ID!) {
		stopGame(gameId: $gameId) {
			id
			isOnline
		}
	}
`;

function GameStateToggle({
	gameId,
	isOnline,
	disabled,
	setDisabled,
}) {
	const [start] = useMutation(START_GAME_MUTATION, {
		variables: { gameId },
	});
	const [stop] = useMutation(STOP_GAME_MUTATION, {
		variables: { gameId },
	});

	async function handleClick() {
		setDisabled(true);
		return (isOnline ? stop() : start()).finally(() => {
			setDisabled(false);
		});
	}

	return (
		<Button
			size="sm"
			disabled={disabled}
			variant={isOnline ? 'warning' : 'success'}
			onClick={handleClick}
		>
			{isOnline ? 'Stop' : 'Start'}
		</Button>
	);
}

GameStateToggle.propTypes = {
	gameId: PropTypes.string.isRequired,
	isOnline: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired,
	setDisabled: PropTypes.func.isRequired,
};

export default GameStateToggle;
