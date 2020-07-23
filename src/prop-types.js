import PropTypes from 'prop-types';

export const userPropType = {
	id: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};

export const gamePropType = PropTypes.shape({
	name: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	isOnline: PropTypes.bool.isRequired,
	creator: PropTypes.shape({
		id: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
});
