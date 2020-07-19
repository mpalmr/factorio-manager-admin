import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';

const DEACTIVATE_GAME_MUTATION = gql`
	mutation DeactivateGame($gameId: ID!) {
		deactivateGame(gameId: $gameId)
	}
`;

function DeactivateGameButton({ gameId }) {
	const [deactivate, { loading }] = useMutation(DEACTIVATE_GAME_MUTATION, {
		variables: { gameId },
	});

	return (
		<Button disabled={loading} variant="danger" size="sm" onClick={deactivate}>
			Deactivate
		</Button>
	);
}

DeactivateGameButton.propTypes = { gameId: PropTypes.string.isRequired };

export default DeactivateGameButton;
