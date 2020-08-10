import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import VersionField, { VERSIONS_QUERY } from '../version';

const mocks = [{
	request: { query: VERSIONS_QUERY },
	result: {
		data: { versions: ['latest', '14.4.2', '53.2.1'] },
	},
}];

test('Options', async () => {
	const { container } = render((
		<MockedProvider mocks={mocks}>
			<Formik initialValues={{ foo: '' }}>
				{({ handleSubmit }) => (
					<Form noValidate onSubmit={handleSubmit}>
						<VersionField name="foo" />
					</Form>
				)}
			</Formik>
		</MockedProvider>
	));

	let optionEls = container.querySelectorAll('option');
	expect(optionEls).toHaveLength(1);
	expect(optionEls[0]).toHaveTextContent('latest');

	await waitFor(() => expect(container.querySelectorAll('option')).toHaveLength(3));
	optionEls = container.querySelectorAll('option');
	expect(optionEls[0]).toHaveTextContent('latest');
	expect(optionEls[1]).toHaveTextContent('14.4.2');
	expect(optionEls[2]).toHaveTextContent('53.2.1');
});
