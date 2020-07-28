import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import GameTableRow from './game-table-row';
import { gamePropType } from '../../prop-types';
import { AuthContext } from '../../providers/authentication';

function GameTable({ games }) {
	const { username } = useContext(AuthContext);

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
					<GameTableRow key={game.id} username={username} game={game} />
				))}
			</tbody>
		</Table>
	);
}

GameTable.propTypes = { games: PropTypes.arrayOf(gamePropType) };
GameTable.defaultProps = { games: [] };

export default GameTable;
