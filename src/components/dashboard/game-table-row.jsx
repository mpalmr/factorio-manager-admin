import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Badge, Button } from 'react-bootstrap';
import styles from './game-table-row.scss';
import DeleteGameButton from './delete-game-button';
import GameStateToggle from './game-state-toggle';
import { gamePropType } from '../../prop-types';

function GameTableRow({ username, game }) {
	const [disabled, setDisabled] = useState(false);
	const [didCopy, setDidCopy] = useState(null);

	function handleCopyUrl() {
		setDidCopy(setTimeout(() => {
			setDidCopy(null);
		}, 150));
	}

	useEffect(() => () => {
		if (didCopy) clearTimeout(didCopy);
	}, []);

	return (
		<tr>
			<th>{game.name}</th>
			<td>
				<Badge variant={game.isOnline ? 'success' : 'danger'}>
					{game.isOnline ? 'Online' : 'Offline'}
				</Badge>
			</td>
			<td>{game.version}</td>
			<td>{game.createdAt.toLocaleString()}</td>
			<td>{game.creator.username}</td>
			<td className={styles.controls}>
				<CopyToClipboard text={`factorio:${game.port}`} onCopy={handleCopyUrl}>
					<Button className={cn(styles.copy, didCopy && styles.didCopy)} size="sm" variant="info">
						Copy URL
					</Button>
				</CopyToClipboard>
				{game.creator.username === username && (
					<>
						<GameStateToggle
							gameId={game.id}
							isOnline={game.isOnline}
							disabled={disabled}
							setDisabled={setDisabled}
						/>
						<Button as={Link} to={`/game/${game.id}`} size="sm" variant="secondary">
							Edit
						</Button>
						<DeleteGameButton
							gameId={game.id}
							name={game.name}
							disabled={disabled}
							setDisabled={setDisabled}
						/>
					</>
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
