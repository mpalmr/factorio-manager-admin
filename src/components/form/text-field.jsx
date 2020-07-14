import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function TextField({
	id,
	name,
	label,
	type,
	disabled,
	touched,
	error,
}) {
	return (
		<Form.Group controlId={id}>
			{label && (
				<Form.Label>{label}</Form.Label>
			)}
			<Field
				as={Form.Control}
				name={name}
				type={type}
				disabled={disabled}
				aria-describedby={`${id}-help`}
			/>
			{touched && error && (
				<Form.Text className="text-danger" muted>{error}</Form.Text>
			)}
		</Form.Group>
	);
}

TextField.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	type: PropTypes.oneOf(['text', 'password', 'email']),
	disabled: PropTypes.bool,
	touched: PropTypes.bool.isRequired,
	error: PropTypes.string,
};
TextField.defaultProps = {
	label: null,
	type: 'text',
	disabled: false,
	error: null,
};

export default TextField;
