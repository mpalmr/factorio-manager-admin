import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import CreateGame, { CREATE_GAME_MUTATION } from '../create-game';

describe('Validation', () => {
	test('name', async () => {
		const { getByLabelText, getByText } = render((
			<MockedProvider
				mocks={[{
					request: {
						query: CREATE_GAME_MUTATION,
						variables: {
							game: { name: 'Sup' },
						},
					},
					result: {
						createGame: {
							id: 'supId',
							name: 'Sup',
							version: 'latest',
							createdAt: new Date('2020-01-01'),
						},
					},
				}]}
			>
				<CreateGame />
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
		<MockedProvider
			mocks={[{
				request: {
					query: CREATE_GAME_MUTATION,
					variables: {
						game: { name: 'Sup' },
					},
				},
				result: {
					createGame: {
						id: 'supId',
						name: 'Sup',
						version: 'latest',
						createdAt: new Date('2020-01-01'),
					},
				},
			}]}
		>
			<CreateGame />
		</MockedProvider>
	));

	fireEvent.change(getByLabelText('Name'), {
		target: { value: 'Sup' },
	});
	fireEvent.click(getByText('Create Game'));

	await waitFor(() => expect(getByText('Create Game')).toBeDisabled());
	await waitFor(() => expect(getByText('Create Game')).not.toBeDisabled());
});
