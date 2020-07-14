import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavLink({ children, to }) {
	return (
		<Nav.Link as={Link} to={to}>
			{children}
		</Nav.Link>
	);
}

NavLink.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string.isRequired,
};

export default NavLink;
