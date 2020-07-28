import React from 'react';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import FormControl from '../form-control';

const defaultProps = {
	id: 'mockId',
	name: 'mockName',
	touched: false,
};

test('Shows label if provided', () => {
	const { rerender, container } = render((
		<Formik>
			{() => <FormControl {...defaultProps} />}
		</Formik>
	));
	expect(container.querySelector('label')).toBeNull();

	rerender((
		<Formik>
			{() => <FormControl {...defaultProps} label="Mock Label" />}
		</Formik>
	));
	expect(container.querySelector('label')).toHaveTextContent('Mock Label');
});

test('Shows error if touched is true and an error is provided', () => {
	const { rerender, container } = render((
		<Formik>
			{() => <FormControl {...defaultProps} />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toBeNull();

	rerender((
		<Formik>
			{() => <FormControl {...defaultProps} error="Some error message" />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toBeNull();

	rerender((
		<Formik>
			{() => <FormControl {...defaultProps} touched />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toBeNull();

	rerender((
		<Formik>
			{() => <FormControl {...defaultProps} error="Some error message" touched />}
		</Formik>
	));
	expect(container.querySelector('.text-danger')).toHaveTextContent('Some error message');
});
