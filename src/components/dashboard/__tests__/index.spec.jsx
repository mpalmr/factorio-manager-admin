import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Dashboard, { DASHBOARD_QUERY } from '..';

test('Shows loading indicator while loading', async () => {
	const { container, getByText, findByText } = render((
		<MockedProvider
			mocks={[{
				request: { query: DASHBOARD_QUERY },
				result: {
					data: { games: [] },
				},
			}]}
		>
			<Dashboard />
		</MockedProvider>
	));
	expect(getByText('Loading...')).toBeInTheDocument();
	expect(container.querySelector('form')).not.toBeInTheDocument();
	return expect(findByText('Create Game')).resolves.toBeInTheDocument();
});

test('Shows message for when no games are registered', async () => {
	const { findByText, queryByText } = render((
		<MockedProvider
			mocks={[{
				request: { query: DASHBOARD_QUERY },
				result: {
					data: { games: [] },
				},
			}]}
		>
			<Dashboard />
		</MockedProvider>
	));
	await expect(findByText('No games are currently registered.')).resolves.toBeInTheDocument();
	return expect(queryByText('Creator')).not.toBeInTheDocument();
});
