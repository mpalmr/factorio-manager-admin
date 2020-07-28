import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import { Table } from 'react-bootstrap';
import DeleteGameButton from './delete-game-button';
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
					<tr key={game.id}>
						<th>{game.name}</th>
						<td>{game.version}</td>
						<td>{game.createdAt.toLocaleString()}</td>
						<td>{game.creator.username}</td>
						<td>
							{game.creator.username === username && (
								<DeleteGameButton id={game.id} name={game.name} />
							)}
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

GameTable.fragments = {
	game: gql`
		fragment GameTableGame on Game {
			id
			name
			version
			createdAt
			creator {
				id
				username
			}
		}
	`,
};

export default GameTable;
