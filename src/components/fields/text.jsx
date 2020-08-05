import React from 'react';
import { Field } from 'formik';
import { Form } from 'react-bootstrap';

function TextField(props) {
	return (
		<Field as={Form.Control} {...props} />
	);
}

export default TextField;
