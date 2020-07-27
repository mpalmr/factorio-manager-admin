import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import DeleteGameButton from './delete-game-button';

function GameTable({ games }) {
	return (
		<Table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Version</th>
					<th>Created At</th>
					<th>Creator</th>
					<th aria-label="Controls" />
				</tr>
			</thead>
			<tbody>
				{games.length === 0 ? (
					<tr>
						<td colSpan={5}>There are no games currently active.</td>
					</tr>
				) : games.map(game => (
					<tr key={game.id}>
						<th>{game.name}</th>
						<td>{game.version}</td>
						<td>{game.createdAt.toLocaleString()}</td>
						<td>{game.creator.username}</td>
						<td>
							<DeleteGameButton gameId={game.id} />
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

GameTable.propTypes = {
	games: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		version: PropTypes.string.isRequired,
		createdAt: PropTypes.instanceOf(Date).isRequired,
		creator: PropTypes.shape({
			id: PropTypes.string.isRequired,
			username: PropTypes.string.isRequired,
		}).isRequired,
	})),
};
GameTable.defaultProps = { games: [] };

export default GameTable;
