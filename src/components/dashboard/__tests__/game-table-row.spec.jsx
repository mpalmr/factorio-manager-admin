import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GameTableRow from '../game-table-row';

test('Shows controls if user owns game', () => {
	const { rerender, container } = render((
		<MockedProvider>
			<table>
				<tbody>
					<GameTableRow
						username="SwagSwanson"
						game={{
							id: 'mockGameId',
							name: 'RadGame',
							version: 'latest',
							createdAt: new Date('2020-01-01'),
							isOnline: false,
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
	expect(container.querySelector('td:last-of-type')).toBeEmptyDOMElement();

	rerender((
		<MockedProvider>
			<table>
				<tbody>
					<GameTableRow
						username="SwagSwanson"
						game={{
							id: 'mockGameId',
							name: 'RadGame',
							version: 'latest',
							createdAt: new Date('2020-01-01'),
							isOnline: false,
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
	expect(container.querySelector('td:last-of-type')).not.toBeEmptyDOMElement();
});

test('Status', () => {
	const { rerender, getByText } = render((
		<MockedProvider>
			<table>
				<tbody>
					<GameTableRow
						username="mockName"
						game={{
							id: 'mockGameId',
							name: 'RadGame',
							version: 'latest',
							createdAt: new Date('2020-01-01'),
							isOnline: false,
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
	expect(getByText('Offline')).toHaveClass('badge-danger');

	rerender((
		<MockedProvider>
			<table>
				<tbody>
					<GameTableRow
						username="mockName"
						game={{
							id: 'mockGameId',
							name: 'RadGame',
							version: 'latest',
							createdAt: new Date('2020-01-01'),
							isOnline: true,
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
	expect(getByText('Online')).toHaveClass('badge-success');
});
