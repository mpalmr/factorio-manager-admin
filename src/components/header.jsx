import React from 'react';
import { Nav } from 'react-bootstrap';

function Header() {
	return (
		<Nav>
			<Nav.Item>
				<Nav.Link href="/">Logo</Nav.Link>
			</Nav.Item>
		</Nav>
	);
}

export default Header;
