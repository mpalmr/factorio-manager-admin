import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateGame, { AVAILABLE_VERSIONS_QUERY, CREATE_GAME_MUTATION } from '../create-game';

jest.mock('../create-game.scss');

const mocks = [
	{
		request: {
			query: CREATE_GAME_MUTATION,
			variables: {
				game: {
					name: 'Sup',
					version: 'latest',
				},
			},
		},
		result: {
			data: {
				createGame: {
					id: 'supId',
					name: 'Sup',
					version: 'latest',
					createdAt: new Date('2020-01-01'),
					isOnline: false,
					creator: {
						id: '1',
						username: 'ayyo',
					},
				},
			},
		},
	},
	{
		request: { query: AVAILABLE_VERSIONS_QUERY },
		result: {
			data: {
				availableVersions: [
					'latest',
					'stable',
					'0.17.0',
					'0.16.5',
					'0.16.4',
				],
			},
		},
	},
];

let history;
beforeEach(() => {
	history = createMemoryHistory();
});

describe('Validation', () => {
	test('name', async () => {
		const { getByLabelText, getByText } = render((
			<MockedProvider mocks={mocks}>
				<Router history={history}>
					<CreateGame />
				</Router>
			</MockedProvider>
		));
		const createGameButton = getByText('Create Game');

		fireEvent.click(createGameButton);
		await waitFor(() => expect(getByText('Required')).toBeInTheDocument());

		fireEvent.change(getByLabelText('Name'), {
			target: { value: 'ay' },
		});
		fireEvent.click(createGameButton);
		return waitFor(() => expect(getByText('Name must be at least three characters'))
			.toBeInTheDocument());
	});
});

test('Successful submission', async () => {
	const { getByLabelText, getByText } = render((
		<MockedProvider mocks={mocks}>
			<Router history={history}>
				<CreateGame />
			</Router>
		</MockedProvider>
	));

	fireEvent.change(getByLabelText('Name'), {
		target: { value: 'Sup' },
	});
	fireEvent.click(getByText('Create Game'));

	await waitFor(() => expect(getByText('Create Game')).toBeDisabled());
	await waitFor(() => expect(getByText('Create Game')).not.toBeDisabled());
});
