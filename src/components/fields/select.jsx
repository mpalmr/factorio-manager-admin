import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

function SelectField({ name, options, ...props }) {
	return (
		<Field as="select" name={name} {...props}>
			{options.map(option => (
				<option value={option.value}>{option.label}</option>
			))}
		</Field>
	);
}

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any,
		label: PropTypes.string.isRequired,
	})).isRequired,
};
export default SelectField;
