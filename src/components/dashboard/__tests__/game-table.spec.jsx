import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import GameTable from '../game-table';
import { AuthContext } from '../../../providers/authentication';

test('show notice if there are no games', () => {
	const { container } = render((
		<MockedProvider>
			<AuthContext.Provider value={{ username: 'UncoolPerson' }}>
				<GameTable games={[]} />
			</AuthContext.Provider>
		</MockedProvider>
	));
	expect(container.querySelectorAll('tbody tr')).toHaveLength(1);
	expect(container.querySelectorAll('tbody td')).toHaveLength(1);
	expect(container.querySelector('tbody td'))
		.toHaveTextContent('There are no games currently active.');
	expect(parseInt(container.querySelector('tbody td').getAttribute('colspan'), 10))
		.toBe(container.querySelectorAll('thead th').length);
});

test('Only shows controls when you own the game', () => {
	const { container } = render((
		<MockedProvider>
			<AuthContext.Provider value={{ username: 'UncoolPerson' }}>
				<GameTable
					games={[
						{
							id: '1',
							name: 'LubridermMadness',
							version: 'latest',
							isOnline: false,
							createdAt: new Date('2020-01-01'),
							creator: {
								id: '1',
								username: 'CoolPerson',
							},
						},
						{
							id: '2',
							name: 'JumpingOnly',
							version: 'latest',
							createdAt: new Date('2020-01-01'),
							isOnline: true,
							creator: {
								id: '2',
								username: 'UncoolPerson',
							},
						},
					]}
				/>
			</AuthContext.Provider>
		</MockedProvider>
	));

	expect(container.querySelector('tbody tr:first-of-type td:last-of-type')).toBeEmptyDOMElement();
	expect(container.querySelector('tbody tr:last-of-type td:last-of-type'))
		.not.toBeEmptyDOMElement();
});
