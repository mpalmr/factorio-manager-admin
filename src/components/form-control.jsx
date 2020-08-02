import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function FormControl({
	id,
	component,
	label,
	type,
	touched,
	error,
	onChange,
	...props
}) {
	return (
		<Form.Group controlId={id}>
			{label && (
				<Form.Label>{label}</Form.Label>
			)}
			<Field
				as={component}
				type={type}
				aria-describedby={`${id}-help`}
				{...props}
			/>
			{touched && error && (
				<Form.Control.Feedback className="text-danger" muted>{error}</Form.Control.Feedback>
			)}
		</Form.Group>
	);
}

FormControl.propTypes = {
	id: PropTypes.string.isRequired,
	component: PropTypes.elementType,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	type: PropTypes.oneOf(['text', 'password', 'number']),
	touched: PropTypes.bool.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func,
};
FormControl.defaultProps = {
	component: Form.Control,
	label: null,
	type: null,
	error: null,
	onChange: null,
};

export default FormControl;
