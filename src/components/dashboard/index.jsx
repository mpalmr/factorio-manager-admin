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
	const games = (data?.games || []).map(game => ({
		...game,
		createdAt: new Date(game.createdAt),
	}));

	return (
		<Container>
			<h1>Dashboard</h1>
			{loading ? (
				<LoadingIndicator />
			) : (
				<>
					<GameTable games={games} />
					<CreateGame />
				</>
			)}
		</Container>
	);
}

export default Dashboard;
