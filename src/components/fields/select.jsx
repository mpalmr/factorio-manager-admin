import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import FormGroup from './group';

function SelectField({
	controlId,
	label,
	error,
	name,
	options,
	...props
}) {
	return (
		<FormGroup controlId={controlId} label={label} error={error}>
			<Field as="select" name={name} {...props}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Field>
		</FormGroup>
	);
}

SelectField.propTypes = {
	...FormGroup.propTypes,
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any,
		label: PropTypes.string.isRequired,
	})).isRequired,
};

SelectField.defaultProps = FormGroup.defaultProps;

export default SelectField;
