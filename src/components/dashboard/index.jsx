import React from 'react';
import { Container } from 'react-bootstrap';
import CreateGame from './create-game';

function Dashboard() {
	return (
		<Container>
			<h1>Dashboard</h1>
			<CreateGame />
		</Container>
	);
}

export default Dashboard;
