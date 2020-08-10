import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function FormGroup({
	children,
	controlId,
	label,
	error,
}) {
	return (
		<Form.Group controlId={controlId}>
			{label && (
				<Form.Label>{label}</Form.Label>
			)}
			{children}
			{error && (
				<Form.Control.Feedback className="text-danger" muted>{error}</Form.Control.Feedback>
			)}
		</Form.Group>
	);
}

FormGroup.propTypes = {
	children: PropTypes.node.isRequired,
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string,
	error: PropTypes.string,
};
FormGroup.defaultProps = {
	label: null,
	error: null,
};

export default FormGroup;
