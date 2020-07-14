import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
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
					<Nav.Item>
						<Nav.Link as={Link} to="/login">Login</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to="/register">Register</Nav.Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default Header;
