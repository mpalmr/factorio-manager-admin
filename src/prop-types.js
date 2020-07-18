import PropTypes from 'prop-types';

export const userPropType = {};

export const gamePropType = {
	name: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	isOnline: PropTypes.bool.isRequired,
	creator: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	createdAt: PropTypes.instanceOf(Date).isRequired,
};
