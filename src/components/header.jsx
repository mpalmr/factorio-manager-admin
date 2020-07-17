import React from 'react';
import { useApolloClient, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export const IS_LOGGED_IN = gql`
	query IsLoggedIn {
		isLoggedIn @client
	}
`;

function Header() {
	const client = useApolloClient();
	const { isLoggedIn } = client.cache.readQuery({ query: IS_LOGGED_IN });

	return (
		<Navbar as="header" bg="light" expand="lg">
			<Navbar.Brand href="/">Factorio Admin</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-header-collapse" />
			<Navbar.Collapse id="main-header-collapse">
				<Nav className="mr-auto">
					<Nav.Item>
						<Nav.Link as={Link} to="/">Dashboard</Nav.Link>
					</Nav.Item>
				</Nav>
				<Nav>
					{isLoggedIn ? (
						<Nav.Item>
							<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
						</Nav.Item>
					) : (
						<>
							<Nav.Item>
								<Nav.Link as={Link} to="/login">Login</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link as={Link} to="/register">Register</Nav.Link>
							</Nav.Item>
						</>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
