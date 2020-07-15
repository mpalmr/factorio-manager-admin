import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import TextField from '../text-field';

const defaultProps = {
	id: 'mockId',
	name: 'mockName',
	touched: false,
};

test('Shows label if provided', () => {
	const { rerender, container } = render((
		<Formik>
			{() => <TextField {...defaultProps} />}
		</Formik>
	));
	expect(container.querySelector('label')).toBeNull();

	rerender((
		<Formik>
			{() => <TextField {...defaultProps} label="Mock Label" />}
		</Formik>
	));
	expect(container.querySelector('label')).toHaveTextContent('Mock Label');
});

test('Shows error if touched is true and an error is provided', () => {
	const { rerender, container } = render((
		<Formik>
			{() => <TextField {...defaultProps} />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toBeNull();

	rerender((
		<Formik>
			{() => <TextField {...defaultProps} error="Some error message" />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toBeNull();

	rerender((
		<Formik>
			{() => <TextField {...defaultProps} touched />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toBeNull();

	rerender((
		<Formik>
			{() => <TextField {...defaultProps} error="Some error message" touched />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toHaveTextContent('Some error message');
});
