import React from 'react';
import {
	render,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
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

test('Do not show controls if user does not owns game', () => {
	const { queryByText } = render((
		<MockedProvider mocks={mocks}>
			<table>
				<tbody>
					<GameTableRow
						username="FFFF"
						game={{
							id: '1',
							name: 'RadGame',
							version: 'latest',
							isOnline: false,
							port: 5000,
							createdAt: new Date('2020-01-01'),
							creator: {
								id: 'mockUserId',
								username: 'NotFFFF',
							},
						}}
					/>
				</tbody>
			</table>
		</MockedProvider>
	));

	expect(queryByText('Copy URL')).toBeInTheDocument();
	expect(queryByText('Start')).toBeNull();
	expect(queryByText('Delete')).toBeNull();
});

test('Show controls if user does own game', () => {
	const { queryByText } = render((
		<MockedProvider mocks={mocks}>
			<table>
				<tbody>
					<GameTableRow
						username="FFFF"
						game={{
							id: '1',
							name: 'RadGame',
							version: 'latest',
							isOnline: false,
							port: 5000,
							createdAt: new Date('2020-01-01'),
							creator: {
								id: 'mockUserId',
								username: 'FFFF',
							},
						}}
					/>
				</tbody>
			</table>
		</MockedProvider>
	));

	expect(queryByText('Copy URL')).toBeInTheDocument();
	expect(queryByText('Start')).toBeInTheDocument();
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
		const { getByText } = render((
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
