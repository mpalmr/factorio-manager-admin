import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import DeleteGameButton, { DELETE_GAME_MUTATION } from '../delete-game-button';

test('Clicking on button shows modal', async () => {
	const { getByText, queryByText } = render((
		<MockedProvider>
			<DeleteGameButton id="mockGameId" name="mockGameName" />
		</MockedProvider>
	));

	expect(queryByText('Confirm')).not.toBeInTheDocument();
	fireEvent.click(getByText('Delete'));
	return waitFor(() => expect(queryByText('Confirm')).toBeInTheDocument());
});

test('Cancel closes modal', async () => {
	const { getByText, queryByText } = render((
		<MockedProvider>
			<DeleteGameButton id="mockGameId" name="mockGameName" />
		</MockedProvider>
	));

	fireEvent.click(getByText('Delete'));
	await waitFor(() => expect(queryByText('Confirm')).toBeInTheDocument());
	fireEvent.click(getByText('Cancel'));
	return waitFor(() => expect(queryByText('Confirm')).not.toBeInTheDocument());
});

test('Successful deletion', async () => {
	const { getByText, queryByText } = render((
		<MockedProvider
			mocks={[{
				request: {
					query: DELETE_GAME_MUTATION,
					variables: { gameId: 'mockGameId' },
				},
				result: { deleteGame: null },
			}]}
		>
			<DeleteGameButton id="mockGameId" name="mockGameName" />
		</MockedProvider>
	));

	fireEvent.click(getByText('Delete'));
	await waitFor(() => expect(queryByText('Confirm')).toBeInTheDocument());
	fireEvent.click(getByText('Confirm'));
	return waitFor(() => expect(queryByText('Confirm')).not.toBeInTheDocument());
});
