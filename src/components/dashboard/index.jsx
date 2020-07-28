import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import styles from './index.scss';
import GameTable from './game-table';
import LoadingIndicator from '../loading-indicator';

export const DASHBOARD_QUERY = gql`
	query DashboardQuery {
		games {
			id
			name
			version
			createdAt
			creator {
				id
				username
			}
		}
	}
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
					<div className={styles.lowerControls}>
						<Button as={Link} to="/game/new" variant="success" size="lg">
							Create
						</Button>
					</div>
				</>
			)}
		</Container>
	);
}

export default Dashboard;
