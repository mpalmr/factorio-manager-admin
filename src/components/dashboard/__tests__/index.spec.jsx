import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Dashboard, { DASHBOARD_QUERY } from '..';

const mocks = [{
	request: { query: DASHBOARD_QUERY },
	result: {
		games: [
			{
				id: '1',
				name: 'SuperDuperGame',
				version: 'latest',
				createdAt: new Date('2020-04-03'),
				creator: {
					id: '10',
					username: 'FlexMasterFlux',
				},
			},
			{
				id: '2',
				name: 'iliketrains',
				version: 'latest',
				createdAt: new Date('2020-04-03'),
				creator: {
					id: '11',
					username: 'literallyATrain',
				},
			},
			{
				id: '3',
				name: 'ihatetrains',
				version: 'latest',
				createdAt: new Date('2020-04-03'),
				creator: {
					id: '12',
					username: 'absolutelyNotATrain',
				},
			},
		],
	},
}];

test('Loading state', async () => {
	const { getByText } = render((
		<MockedProvider mocks={mocks}>
			<Dashboard />
		</MockedProvider>
	));

	expect(getByText('Loading...')).toBeInTheDocument();
	await waitFor(() => expect(getByText('Loading...')).not.toBeInTheDocument());
	expect(getByText('Create Game')).toBeInTheDocument();
});
