import React from 'react';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';
import FormGroup from './group';

function TextField({
	controlId,
	label,
	error,
	...props
}) {
	return (
		<FormGroup controlId={controlId} label={label} error={error}>
			<Field as={Form.Control} {...props} />
		</FormGroup>
	);
}

TextField.propTypes = FormGroup.propTypes;
TextField.defaultProps = FormGroup.defaultProps;

export default TextField;
