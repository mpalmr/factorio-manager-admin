import React from 'react';
import { render } from '@testing-library/react';
import { Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import FormGroup from '../group';

test('Shows label if prop is passed', () => {
	const { container, rerender, getByLabelText } = render((
		<Formik>
			{() => (
				<FormGroup controlId="a">
					<p>Children</p>
				</FormGroup>
			)}
		</Formik>
	));
	expect(container.querySelector('label')).toBeNull();

	rerender((
		<Formik initialValues={{ mockField: '' }}>
			{() => (
				<FormGroup controlId="a" label="SKU">
					<Field as={Form.Control} name="mockField" />
				</FormGroup>
			)}
		</Formik>
	));
	expect(getByLabelText('SKU')).toBeInTheDocument();
});
