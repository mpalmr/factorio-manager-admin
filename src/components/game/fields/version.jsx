import React from 'react';
import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import SelectField from '../../fields/select';

export const VERSIONS_QUERY = gql`
	query Versions {
		versions
	}
`;

function GameVersionField({ disabled, ...props }) {
	const { data, loading } = useQuery(VERSIONS_QUERY);

	const options = Array.isArray(data?.versions)
		? data?.versions.map(version => ({ value: version, label: version }))
		: [{ value: 'latest', label: 'latest' }];

	return (
		<SelectField
			{...props}
			options={options}
			disabled={disabled || loading}
		/>
	);
}

GameVersionField.propTypes = { disabled: PropTypes.bool };
GameVersionField.defaultProps = { disabled: false };

export default GameVersionField;
