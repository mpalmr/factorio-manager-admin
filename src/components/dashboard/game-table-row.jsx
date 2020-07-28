import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteGameButton from './delete-game-button';
import GameStateToggle from './game-state-toggle';
import { gamePropType } from '../../prop-types';

function GameTableRow({ username, game }) {
	const [disabled, setDisabled] = useState(false);

	return (
		<tr>
			<th>{game.name}</th>
			<td>{game.version}</td>
			<td>{game.createdAt.toLocaleString()}</td>
			<td>{game.creator.username}</td>
			<td>
				<GameStateToggle
					gameId={game.id}
					isOnline={game.isOnline}
					disabled={disabled}
					setDisabled={setDisabled}
				/>
				{game.creator.username === username && (
					<DeleteGameButton
						gameId={game.id}
						name={game.name}
						disabled={disabled}
						setDisabled={setDisabled}
					/>
				)}
			</td>
		</tr>
	);
}

GameTableRow.propTypes = {
	username: PropTypes.string.isRequired,
	game: gamePropType.isRequired,
};

export default GameTableRow;
