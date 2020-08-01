import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GameTableRow from '../game-table-row';
import { START_GAME_MUTATION, STOP_GAME_MUTATION } from '../game-state-toggle';

const mocks = [
	{
		request: {
			query: START_GAME_MUTATION,
			variables: { gameId: '1' },
		},
		result: {
			startGame: {
				id: '1',
				isOnline: true,
			},
		},
	},
	{
		request: {
			query: STOP_GAME_MUTATION,
			variables: { gameId: '1' },
		},
		result: {
			stopGame: {
				id: '1',
				isOnline: false,
			},
		},
	},
];

test.skip('Shows controls if user owns game', () => {
	const { rerender, queryByText } = render((
		<MockedProvider mocks={mocks}>
			<table>
				<tbody>
					<GameTableRow
						username="SwagSwanson"
						game={{
							id: '1',
							name: 'RadGame',
							version: 'latest',
							isOnline: false,
							port: 5000,
							createdAt: new Date('2020-01-01'),
							creator: {
								id: 'mockUserId',
								username: 'NotSwagSwanson',
							},
						}}
					/>
				</tbody>
			</table>
		</MockedProvider>
	));
	expect(queryByText('Copy URL')).toBeInTheDocument();
	expect(queryByText('Stop')).not.toBeInTheDocument();
	expect(queryByText('Delete')).not.toBeInTheDocument();

	rerender((
		<MockedProvider mocks={mocks}>
			<table>
				<tbody>
					<GameTableRow
						username="SwagSwanson"
						game={{
							id: '1',
							name: 'RadGame',
							version: 'latest',
							isOnline: false,
							port: 5000,
							createdAt: new Date('2020-01-01'),
							creator: {
								id: 'mockUserId',
								username: 'SwagSwanson',
							},
						}}
					/>
				</tbody>
			</table>
		</MockedProvider>
	));
	expect(queryByText('Copy URL')).toBeInTheDocument();
	expect(queryByText('Stop')).toBeInTheDocument();
	expect(queryByText('Delete')).toBeInTheDocument();
});

describe('Status', () => {
	test.skip('Start', async () => {
		const { getByText, queryByText } = render((
			<MockedProvider mocks={mocks}>
				<table>
					<tbody>
						<GameTableRow
							username="mockName"
							game={{
								id: '1',
								name: 'RadGame',
								version: 'latest',
								isOnline: false,
								port: 5000,
								createdAt: new Date('2020-01-01'),
								creator: {
									id: 'mockUserId',
									username: 'mockName',
								},
							}}
						/>
					</tbody>
				</table>
			</MockedProvider>
		));

		act(() => {
			fireEvent.click(getByText('Start'));
		});
		return waitFor(() => expect(queryByText('Online')).toHaveClass('badge-success'));
	});

	test.skip('Stop', async () => {
		const { getByText, queryByText } = render((
			<MockedProvider mocks={mocks}>
				<table>
					<tbody>
						<GameTableRow
							username="mockName"
							game={{
								id: '1',
								name: 'RadGame',
								version: 'latest',
								isOnline: true,
								port: 5000,
								createdAt: new Date('2020-01-01'),
								creator: {
									id: 'mockUserId',
									username: 'mockName',
								},
							}}
						/>
					</tbody>
				</table>
			</MockedProvider>
		));

		act(() => {
			fireEvent.click(getByText('Stop'));
		});
	});
});
