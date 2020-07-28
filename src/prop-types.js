import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const gamePropType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	isOnline: PropTypes.bool.isRequired,
	version: PropTypes.string.isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
	creator: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}),
});
