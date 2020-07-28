import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function FormControl({
	id,
	component,
	label,
	touched,
	error,
	...props
}) {
	return (
		<Form.Group controlId={id}>
			{label && (
				<Form.Label>{label}</Form.Label>
			)}
			<Field as={component} aria-describedby={`${id}-help`} {...props} />
			{touched && error && (
				<Form.Text className="text-danger" muted>{error}</Form.Text>
			)}
		</Form.Group>
	);
}

FormControl.propTypes = {
	id: PropTypes.string.isRequired,
	component: PropTypes.elementType,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	touched: PropTypes.bool.isRequired,
	error: PropTypes.string,
};
FormControl.defaultProps = {
	component: Form.Control,
	label: null,
	error: null,
};

export default FormControl;
