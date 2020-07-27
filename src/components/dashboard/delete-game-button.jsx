import React from 'react';
import PropTypes from 'prop-types';

function DeleteGameButton({ id }) {
	console.log(id);
	return (
		<p>AY</p>
	);
}

DeleteGameButton.propTypes = { id: PropTypes.string.isRequired };

export default DeleteGameButton;
