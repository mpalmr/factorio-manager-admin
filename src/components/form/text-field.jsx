import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function TextField({
	id,
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
			<Field as={Form.Control} aria-describedby={`${id}-help`} {...props}	/>
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
	touched: PropTypes.bool.isRequired,
	error: PropTypes.string,
};
TextField.defaultProps = {
	label: null,
	error: null,
};

export default TextField;
