import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import GameTable from './game-table';
import CreateGame from './create-game';
import LoadingIndicator from '../loading-indicator';

export const DASHBOARD_QUERY = gql`
	query DashboardQuery {
		games {
			...NewGame
			creator {
				id
				username
			}
		}
	}
	${CreateGame.fragments.newGame}
`;

function Dashboard() {
	const { data, loading } = useQuery(DASHBOARD_QUERY);

	return (
		<Container>
			<h1>Dashboard</h1>
			{loading ? (
				<LoadingIndicator />
			) : (
				<>
					<GameTable games={data.games} />
					<CreateGame />
				</>
			)}
		</Container>
	);
}

export default Dashboard;
