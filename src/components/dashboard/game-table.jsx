import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { gql } from '@apollo/client';
import { Table } from 'react-bootstrap';
import styles from './game-table.scss';
import { gamePropType } from '../../prop-types';

function GameTable({ games }) {
	return (
		<Table responsive="sm" striped bordered hover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Version</th>
					<th>Status</th>
					<th>Creator</th>
					<th>Created At</th>
				</tr>
			</thead>
			<tbody>
				{games.map(game => (
					<tr>
						<th>{game.name}</th>
						<td>{game.version}</td>
						<td className={cn('status', game.isOnline ? styles.online : '')} />
						<td>{game.creator.username}</td>
						<td>{game.createdAt.toLocaleString()}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

GameTable.propTypes = { games: PropTypes.arrayOf(gamePropType.isRequired).isRequired };

GameTable.fragments = {
	game: gql`
		fragment TableGame on Game {
			id
			version
			isOnline
			creator {
				id
				username
			}
			createdAt
		}
	`,
};

export default GameTable;
